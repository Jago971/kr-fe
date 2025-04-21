import React from "react";
import { Outlet } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import Footer from "../components/Footer";
import DevSnippet from "../components/DevSnippet";

const AuthLayout: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col h-screen justify-between items-center p-6 pb-4 md:p-4 md:pb-2 gap-4 bg-orange-100">
      <AppTitle />
      <div className="w-full max-w-md flex flex-col gap-4 overflow-auto">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
