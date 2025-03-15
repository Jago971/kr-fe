import React from "react";
import SignUpForm from "../components/SignUpForm";
import AuthLayout from "../layouts/Auth";

const SignUp: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Sign Up">
        <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
