import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, AuthError } from "../services/auth";

interface FormData {
  username: string;
  password: string;
}

const LogIn: React.FunctionComponent = () => {
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnverified, setIsUnverified] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

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
      const response = await authenticate("login", {
        username: formData.username,
        password: formData.password,
      });

      alert(response?.message);

      if (response && response.status === "success") {
        setFormData({ username: "", password: "" });
        navigate(`/kind-remind/dashboard`);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        if (error instanceof AuthError) {
          if (error.status === 401) {
            setIsUnverified(true);
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
      <h1 className="p-2 md:p-1 text-center w-full max-w-md text-3xl md:text-xl border-b-2 border-neutral-800 text-neutral-800">
        Log In
      </h1>
      <form
        className="flex flex-col items-center gap-4 md:gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border rounded-md p-2 border-neutral-800 md:p-1 md:px-2 md:text-xs md:rounded-sm"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="w-full border rounded-md p-2 border-neutral-800 md:p-1 md:px-2 md:text-xs md:rounded-sm"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 border-2 border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-md shadow-md
            shadow-neutral-500 transition-all duration-50 md:w-2/5 md:p-1 md:text-base md: mt-2 ${
              clicked ? clickedStyle : notClickedStyle
            }`}
        >
          {isLoading ? "Logging In..." : "Log in"}
        </button>
      </form>
      {!isUnverified && (
        <p className="text-center text-neutral-800 md:text-xs">
          📝 Don't have an account?
          <Link to="/kind-remind/signup" className="underline cursor-pointer">
            Sign up
          </Link>
        </p>
      )}
      {isUnverified && !isLoading && (
        <div className="text-center text-neutral-800">
          <p>❗ Your account is not verified!</p>
          <p>📬 Check your email to verify your account.</p>
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </>
  );
};

export default LogIn;
