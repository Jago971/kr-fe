import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, AuthError } from "../services/auth";

interface FormData {
  username: string;
  email: string;
  password: string;
  profile_pic: string;
}

const SignUp: React.FunctionComponent = () => {
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";
  const profile_urls = [
    "/public/profiles/bear.jpeg",
    "/public/profiles/bird.jpeg",
    "/public/profiles/cat.jpeg",
    "/public/profiles/dog.jpeg",
    "/public/profiles/fox.jpeg",
    "/public/profiles/monkey.jpeg",
    "/public/profiles/panda.jpeg",
    "/public/profiles/rabbit.jpeg",
  ];

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * profile_urls.length);
    setFormData((prevData) => ({
      ...prevData,
      profile_pic: profile_urls[randomIndex],
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 100);
    setError(null);
    setRedirect(false);
    setIsSignedUp(false);
    setIsLoading(true);
  
    try {
      const response = await authenticate("signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile_pic: formData.profile_pic,
      });
  
      alert(response?.message);

      if (response && response.status === "success") {
        setIsSignedUp(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof AuthError) {
          if (error.status === 409) {
            setRedirect(true);
          } else {
            setError(error.message);
          }
        } else {
          // Regular error
          setError(error.message);
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
    <>
      <h1 className="p-2 text-center w-full max-w-md text-3xl border-b-2 border-neutral-800 text-neutral-800">
        Sign Up
      </h1>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <input
          className="border rounded-lg p-2 border-neutral-800"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="border rounded-lg p-2 border-neutral-800"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="border rounded-lg p-2 border-neutral-800"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button
          className={`p-2 border-2 border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-lg shadow-md shadow-neutral-500 transition-all duration-50 ${
            clicked ? clickedStyle : notClickedStyle
          }`}
          type="submit"
        >
          {isLoading ? "Signing Up..." : isSignedUp ? "Signed up" : "Sign up"}
        </button>
      </form>
      {isSignedUp && !isLoading && (
        <div className="text-center text-neutral-800">
          <p>✅ Account created!</p>
          <p>📬 Check your email to verify your account.</p>
          <p>
            🔑 Then {""}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/kind-remind/login")}
            >
              login here
            </span>
            .
          </p>
        </div>
      )}
      {redirect && !isLoading && (
        <p className="text-center text-neutral-800">
          You already have an account. You can {""}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/kind-remind/login")}
          >
            login here
          </span>
          .
        </p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}
    </>
  );
};

export default SignUp;
