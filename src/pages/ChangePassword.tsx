import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/auth";

interface FormData {
  password: string;
  confirmPassword: string;
}

const SignUp: React.FunctionComponent = () => {
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [passwordIsChanged, setPasswordIsChanged] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
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

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await changePassword({
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: token as string,
      });

      alert(response?.message);

      if (response && response.status === "success") {
        setPasswordIsChanged(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
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
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          className="border rounded-lg p-2 border-neutral-800"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
        <button
          className={`p-2 border-2 border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-lg shadow-md shadow-neutral-500 transition-all duration-50 ${
            clicked ? clickedStyle : notClickedStyle
          }`}
          type="submit"
        >
          {isLoading
            ? "Changing password..."
            : passwordIsChanged
            ? "Password updated"
            : "Change password"}
        </button>
      </form>
      {passwordIsChanged && !isLoading && (
        <div className="text-center text-neutral-800">
          <p>✅ Password updated!</p>
          <p>
            🔑 Now, using your new password, {""}
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

      {error && <p className="text-center text-red-500">{error}</p>}
    </>
  );
};

export default SignUp;
