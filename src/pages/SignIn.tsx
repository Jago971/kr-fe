import React from "react";
import SignUpForm from "../components/SignUpForm";
import AuthLayout from "../layouts/Auth";

const SignIn: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Sign In">
        <SignUpForm />
    </AuthLayout>
  );
};

export default SignIn;
