import React, { useState } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import Dashboard from "../components/Dashboard";

const DashboardLayout: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "tasks" | "messages">(
    "home"
  );

  //  const renderPage = () => {
  //     switch (currentPage) {
  //       case "tasks":
  //         return <Tasks />;
  //       case "messages":
  //         return <Messages />;
  //       default:
  //         return <Home />;
  //     }
  //   };

  return (
    <div className="flex flex-col items-center h-screen p-4 gap-4 bg-orange-100">
      <Header></Header>
      <main className="border h-full w-full max-w-md">
        <Dashboard activeComponent={currentPage} />
      </main>
      <Nav handleClick={setCurrentPage} activeComponent={currentPage}></Nav>
    </div>
  );
};

export default DashboardLayout;
