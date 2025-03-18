import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

interface FormData {
  username: string;
  password: string;
}

interface SignInFormProps {
  title: string;
}

const SignInForm: React.FunctionComponent<SignInFormProps> = ({ title }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(formData.username, formData.password);
      alert(data.message);
      navigate('/home');
      setFormData({ username: "", password: "" });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
    
    
  };

  return (
    <>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <input
          className="border rounded-md p-2 border-neutral-800"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="border rounded-md p-2 border-neutral-800"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="p-2 border-2  border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-md"
          type="submit"
        >
          {title}
        </button>
      </form>
      <p className="text-center text-neutral-800">
        Don't have an account?{" "}
        <a className="underline" href="/signup">
          Sign up
        </a>
      </p>
    </>
  );
};

export default SignInForm;
