import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { logout } from "../services/auth";

export const Header = () => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";
  const buttonStyle =
    "border-2 border-neutral-800 text-neutral-800 rounded-lg shadow-md shadow-neutral-500 text-lg px-1 cursor-pointer transition-all duration-50";

  const handleLogout = async () => {
    setClickedButton("logout");
    setTimeout(() => {
      setClickedButton(null);
    }, 100);

    try {
      const response = await logout();
      console.log(response)
      if (response) {
        localStorage.removeItem('accessToken');
        navigate(`/kind-remind/login`);
      }
    } catch (error) {
      setError("An error occurred while logging out.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center w-full h-40 max-w-md">
        <div className="flex w-full h-full items-center gap-2">
          <div className="border rounded-full aspect-square h-full text-center">
            pic
          </div>
          <div
            className={`${buttonStyle} ${
              clickedButton === "username" ? clickedStyle : notClickedStyle
            } bg-yellow-200`}
          >
            username
          </div>
          <div
            className={`${buttonStyle} ${
              clickedButton === "edit" ? clickedStyle : notClickedStyle
            } bg-yellow-200 aspect-square flex items-center`}
          >
            <TiPencil className="transform scale-130" />
          </div>
        </div>
        <button
          className={`${buttonStyle} ${
            clickedButton === "logout" ? clickedStyle : notClickedStyle
          } bg-red-300`}
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
    </>
  );
};
