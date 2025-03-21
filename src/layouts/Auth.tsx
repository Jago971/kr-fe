import React from "react";
import { Outlet } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import Footer from "../components/Footer";

const AuthLayout: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center p-16 gap-16 bg-orange-100">
      <AppTitle />
      <div className="w-full max-w-md flex flex-col gap-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
