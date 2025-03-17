import React, { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

interface SignInFormProps {
  title: string;
}

const SignInForm: React.FunctionComponent<SignInFormProps> = ({ title }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ username: "", password: "" });
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
        <button
          className="p-2 border-2  border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-md"
          type="submit"
        >
          {title}
        </button>
      </form>
      <p className="text-center text-neutral-800">Don't have an account? <a className="underline" href="/signup">Sign up</a></p>
    </>
  );
};

export default SignInForm;
