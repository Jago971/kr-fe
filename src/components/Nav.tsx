import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { RiTaskLine } from "react-icons/ri";

export const Nav = () => {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];

    if (currentPath === "home") {
      setSelectedIcon(0); // Home is selected
    } else if (currentPath === "tasks") {
      setSelectedIcon(1); // Task is selected
    } else if (currentPath === "messages") {
      setSelectedIcon(2); // Message is selected
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <nav className="relative bg-orange-100 border-t-2 border-neutral-800 mt-auto w-full max-w-md flex justify-between items-center pb-2 pt-6 px-6">
      <a href="/home" onClick={() => setSelectedIcon(0)}>
        <AiOutlineHome
          className={`text-5xl mx-2 ${
            selectedIcon === 0 ? "text-neutral-800" : "text-neutral-400"
          }`}
        />
      </a>
      <a href="/tasks" onClick={() => setSelectedIcon(1)}>
        <RiTaskLine
          className={`text-5xl mx-2 ${
            selectedIcon === 1 ? "text-neutral-800" : "text-neutral-400"
          }`}
        />
      </a>
      <a href="/messages" onClick={() => setSelectedIcon(2)}>
        <BiMessageAlt
          className={`text-5xl mx-2 ${
            selectedIcon === 2 ? "text-neutral-800" : "text-neutral-400"
          }`}
        />
      </a>
      <div
        className={`absolute border h-8/10 aspect-square rounded-lg transition-all duration-500 ease-in-out ${
          selectedIcon === 0
            ? "left-6"
            : selectedIcon === 1
            ? "left-1/2 transform -translate-x-1/2"
            : "right-6"
        }`}
      ></div>
    </nav>
  );
};
