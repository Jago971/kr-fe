import React, { ReactNode } from "react";
import AppTitle from "../components/AppTitle";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center p-16 gap-16 bg-orange-100">
      <AppTitle />
      <div className="w-full max-w-md flex flex-col gap-8">
        <h1 className="text-center w-full max-w-md text-3xl border-b-2 border-neutral-800 text-neutral-800">{title}</h1>
          {children}
      </div>
    </div>
  );
};

export default AuthLayout;
