import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4 bg-gray-100">
      <h1 className="w-full max-w-md">{title}</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
