import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { RiTaskLine } from "react-icons/ri";

interface NavProps {
  handleClick: (component: "home" | "tasks" | "messages") => void;
  activeComponent: "home" | "tasks" | "messages";
}

export const Nav: React.FunctionComponent<NavProps> = ({
  handleClick,
  activeComponent,
}) => {
  const buttonStyling = "p-2 rounded-md transition-all duration-300 cursor-pointer md:p-1 md:rounded-sm"
  const unselectedStyle = "border-2 border-transparent text-neutral-400";
  const selectedStyle =
    "border-2 border-neutral-800 text-neutral-800 bg-yellow-200 text-xl rounded-lg shadow-md shadow-neutral-500";

    return (
      <nav className="relative border-t-2 border-neutral-800 mt-auto w-full max-w-md flex justify-between items-center p-4 pb-0 md:justify-center md:gap-8 md:p-2">
        {/* Home button */}
        <button
          onClick={() => handleClick("home")}
          className={`${buttonStyling} ${
            activeComponent === "home" ? selectedStyle : unselectedStyle
          }`}
        >
          <AiOutlineHome className="text-4xl md:text-xl" />
        </button>
  
        {/* Tasks button */}
        <button
          onClick={() => handleClick("tasks")}
          className={`${buttonStyling} ${
            activeComponent === "tasks" ? selectedStyle : unselectedStyle
          }`}
        >
          <RiTaskLine className="text-4xl md:text-xl" />
        </button>
  
        {/* Messages button */}
        <button
          onClick={() => handleClick("messages")}
          className={`${buttonStyling} ${
            activeComponent === "messages" ? selectedStyle : unselectedStyle
          }`}
        >
          <BiMessageAlt className="text-4xl md:text-xl" />
        </button>
      </nav>
    );
};
