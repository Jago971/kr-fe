import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authService";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FunctionComponent = () => {
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);
  const [redirect, setRedirect] = useState(false);

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
    setIsLoading(true);

    try {
      const data = await authenticate("signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (data) {
        setFormData({ username: "", email: "", password: "" });
        alert(data.message);
        setIsSignedUp(true);
        if (data.redirect) setRedirect(true);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
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
      {isSignedUp && !isLoading && redirect && (
        <p className="text-center text-neutral-800">
          Successfully signed up! You can now{" "}
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
