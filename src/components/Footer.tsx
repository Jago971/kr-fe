import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoCodepen } from "react-icons/io";
import { Link } from "react-router-dom"; // For internal links

const Footer = () => {
  const hover =
    "border-2 border-transparent text-neutral-800 hover:border-neutral-800 hover:bg-yellow-200 hover:shadow-md hover:shadow-neutral-500 transition-all duration-300 p-2 rounded-lg";
  return (
    <footer className="mt-auto w-full max-w-md flex flex-col gap-2 p-2 bg-orange-100 text-neutral-800 border-t-2 border-neutral-800">
      <div className="w-full text-center">
        <p className="text-sm">
          &copy; 2025 Matt Mannings. All rights reserved.
        </p>
      </div>
      <div className="w-full flex justify-evenly">
        <a
          href="https://github.com/Jago971"
          target="_blank"
          rel="noopener noreferrer"
          className={hover}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/matt-mannings/"
          target="_blank"
          rel="noopener noreferrer"
          className={hover}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://codepen.io/your-work"
          target="_blank"
          rel="noopener noreferrer"
          className={hover}
        >
          <IoLogoCodepen size={24} />
        </a>
        <Link to="/about" className={hover}>
          About
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
