import React from "react";
import AuthLayout from "../layouts/Auth";
import SignUpForm from "../components/SignUpForm";

const SignUp: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Sign Up">
      <SignUpForm title="Sign Up" />
    </AuthLayout>
  );
};

export default SignUp;
