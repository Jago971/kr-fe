import React from "react";
import { FiAtSign, FiLogOut } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineKey } from "react-icons/ai";

interface ButtonProps {
  type: "email" | "password" | "logout" | "delete";
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, action: string) => void;
  clickedButton: string | null;
  style: string;
}

const icons = {
    email: <FiAtSign />,
    password: <AiOutlineKey />,
    logout: <FiLogOut />,
    delete: <AiOutlineDelete />,
}


const Button: React.FC<ButtonProps> = ({
  type,
  text,
  handleClick,
  clickedButton,
  style,
}) => {
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";
  const buttonStyle =
    "flex justify-center items-center gap-2 cursor-pointer p-2 border-2 border-neutral-800 text-neutral-800 text-xl rounded-lg shadow-neutral-500 transition-all duration-150";
  const buttonInteract = "cursor-pointer transition-all duration-50";

  return (
    <button
      onClick={(e) => handleClick(e, type)}
      className={`${buttonStyle} ${buttonInteract} ${
        clickedButton === type ? clickedStyle : notClickedStyle
      } ${style}`}
    >
        {icons[type]}
      <p>{text}</p>
    </button>
  );
};

export default Button;
