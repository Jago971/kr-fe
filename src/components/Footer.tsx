import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoCodepen } from "react-icons/io";

const Footer: React.FunctionComponent = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent, href: string, selected: string) => {
    e.preventDefault();
    setSelected(selected);

    setTimeout(() => {
      setSelected(null);
      window.open(href, "_blank", "noopener,noreferrer");
    }, 500);
  };

  const baseStyles =
    "border-2 text-neutral-800 transition-all duration-300 px-1 rounded-lg text-lg md:text-xxs";
  const hoverStyles =
    "hover:border-neutral-800 hover:bg-yellow-200 hover:shadow-md hover:shadow-neutral-500";
  const clickStyles =
    "border-2 border-neutral-800 bg-yellow-200 shadow-md shadow-neutral-500";

  return (
    <footer className="w-full max-w-md flex flex-col gap-2 pt-2 md:gap-0 md:pt-0 bg-orange-100 text-neutral-800 border-t-2 border-neutral-800">
      <div className="w-full text-center">
        <p className="text-sm md:text-xs mt-2">
          &copy; 2025 Matt Mannings. All rights reserved.
        </p>
      </div>
      <div className="w-full flex justify-evenly">
        <button
          onClick={(e) =>
            handleClick(e, "https://github.com/Jago971", "github")
          }
          className={`${baseStyles} ${hoverStyles} ${
            selected === "github" ? clickStyles : "border-transparent"
          }`}
        >
          <FaGithub  className="text-xl" />
        </button>

        <button
          onClick={(e) =>
            handleClick(
              e,
              "https://www.linkedin.com/in/matt-mannings/",
              "linkedin"
            )
          }
          className={`${baseStyles} ${hoverStyles} ${
            selected === "linkedin" ? clickStyles : "border-transparent"
          }`}
        >
          <FaLinkedin  className="text-xl" />
        </button>

        <button
          onClick={(e) =>
            handleClick(e, "https://codepen.io/your-work", "codepen")
          }
          className={`${baseStyles} ${hoverStyles} ${
            selected === "codepen" ? clickStyles : "border-transparent"
          }`}
        >
          <IoLogoCodepen  className="text-xl" />
        </button>

        <button
          onClick={(e) => handleClick(e, "/about", "about")}
          className={`${baseStyles} ${hoverStyles} ${
            selected === "about" ? clickStyles : "border-transparent"
          }`}
        >
          About
        </button>
      </div>
    </footer>
  );
};

export default Footer;
