import React from "react";
import AuthLayout from "../layouts/Auth";
import SignInForm from "../components/SignInForm";

const SignIn: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Sign In">
      <SignInForm title="Sign In" />
    </AuthLayout>
  );
};

export default SignIn;
