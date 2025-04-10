import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CrudLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null); // Ref for the form
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const clickedStyle = "shadow-none scale-95";
  const notClickedStyle = "shadow-md";
  const buttonStyle =
    "h-fit border-2 border-neutral-800 text-neutral-800 rounded-md shadow-md shadow-neutral-500 text-lg px-1";
  const buttonInteract = " cursor-pointer transition-all duration-50";

  const handleCancel = () => {
    setClickedButton("cancel");
    setTimeout(() => {
      setClickedButton(null);
      navigate("/kind-remind/dashboard");
    }, 100);
  };

  const handleSave = () => {
    setClickedButton("save");
    setTimeout(() => {
      setClickedButton(null);
    }, 100);

    // Trigger form submission via ref
    formRef.current?.requestSubmit(); // This will trigger the form's onSubmit event
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4 bg-orange-100">
      {/* Header with Save and Cancel buttons */}
      <div className="relative w-full max-w-md border-b-2 border-neutral-800 text-neutral-800">
        <h1 className="p-2 text-3xl text-center">Profile</h1>

        {/* Save button (Left) */}
        <button
          className={`${buttonStyle} ${buttonInteract} ${
            clickedButton === "save" ? clickedStyle : notClickedStyle
          } bg-yellow-200 absolute left-0 top-1/2 -translate-y-1/2`}
          onClick={handleSave}
        >
          Save
        </button>

        {/* Cancel button (Right) */}
        <button
          className={`${buttonStyle} ${buttonInteract} ${
            clickedButton === "cancel" ? clickedStyle : notClickedStyle
          } bg-red-300 absolute right-0 top-1/2 -translate-y-1/2`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      {/* Main content area */}
      <main className="h-full w-full max-w-md overflow-y-auto scrollbar-hidden scrollbar-hidden">
        <form ref={formRef} method="POST">
          <Outlet />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CrudLayout;
