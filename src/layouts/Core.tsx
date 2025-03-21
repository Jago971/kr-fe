import React, { useState } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import Tasks from "../pages/Tasks";
import Messages from "../pages/Messages";
import Home from "../pages/Home";

const CoreLayout: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<
    "home" | "tasks" | "messages"
  >("home");

 const renderPage = () => {
    switch (currentPage) {
      case "tasks":
        return <Tasks />;
      case "messages":
        return <Messages />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 gap-4 bg-orange-100">
      <Header></Header>
      <main className="border w-full max-w-md">
        {renderPage()}
      </main>
      <Nav
        handleClick={setCurrentPage}
        activeComponent={currentPage}
      ></Nav>
    </div>
  );
};

export default CoreLayout
