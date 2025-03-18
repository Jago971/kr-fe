import React from "react";
import AuthLayout from "../layouts/Auth";
import LogInForm from "../components/LogInForm";

const LogIn: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Log In">
      <LogInForm title="Log In" />
    </AuthLayout>
  );
};

export default LogIn;
