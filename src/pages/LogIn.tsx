import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../services/auth";

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
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);

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
      const data = await authenticate("login", {
        username: formData.username,
        password: formData.password,
      });

      if (data) {
        setFormData({ username: "", password: "" });
        alert(data.message);
        if (data.redirect) navigate(`/kind-remind`);
        // set userId in state here
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
        Log In
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
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className={`p-2 border-2 border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-lg shadow-md shadow-neutral-500 transition-all duration-50 ${
            clicked ? clickedStyle : notClickedStyle
          }`}
        >
          {isLoading ? "Logging In..." : "Log in"}
        </button>
      </form>
      <p className="text-center text-neutral-800">
        Don't have an account?
        <Link to="/kind-remind/signup" className="underline cursor-pointer">
          Sign up
        </Link>
      </p>
      {error && <p className="text-center text-red-500">{error}</p>}
    </>
  );
};

export default LogIn;
