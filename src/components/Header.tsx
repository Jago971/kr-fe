import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { logout } from "../services/auth";

interface HeaderProps {
  data: { [key: string]: any };
}

export const Header = ({ data }: HeaderProps) => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-xs";
  const buttonStyle =
    "border-2 border-neutral-800 text-neutral-800 rounded-md shadow-neutral-500 text-lg px-1 md:rounded-sm md:text-xs md:py-0.5 md:px-1";
  const buttonInteract = " cursor-pointer transition-all duration-150";

  const handleLogout = async () => {
    setClickedButton("logout");
    setTimeout(() => {
      setClickedButton(null);
    }, 300);

    try {
      const response = await logout();
      if (response) {
        localStorage.removeItem("accessToken");
        setTimeout(() => {
          navigate(`/kind-remind/login`);
        }, 300);
      }
    } catch (error) {
      setError("An error occurred while logging out.");
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setClickedButton("edit");
    setTimeout(() => {
      setClickedButton(null);
    }, 150);
    setTimeout(() => {
      navigate("/kind-remind/profile");
    }, 300);
  };

  return (
    <>
          {console.log(data)}
      <div className="flex items-center w-full h-30 max-w-md md:h-20">
        <div className="flex w-full h-full items-center gap-2">
          <div
            className="border rounded-full aspect-square h-full text-center bg-white"
            style={{
              backgroundImage: `url(${data.user.profile_pic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
          {data.user.username && (
            <div
              className={`${buttonStyle} ${
                clickedButton === "username" ? clickedStyle : notClickedStyle
              } bg-yellow-200`}
            >
              {data.user.username}
            </div>
          )}
          <button
            onClick={handleEditProfile}
            className={`${buttonStyle} ${buttonInteract} ${
              clickedButton === "edit" ? clickedStyle : notClickedStyle
            } bg-yellow-200 aspect-square flex items-center`}
          >
            <TiPencil className="transform scale-130 md:scale-120" />
          </button>
        </div>
        <button
          className={`${buttonStyle} ${buttonInteract} ${
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
