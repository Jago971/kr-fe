import React from "react";
import SignUpForm from "../components/SignUpForm";
import AuthLayout from "../layouts/Auth";

const SignUp: React.FunctionComponent = () => {
  return (
    <AuthLayout>
      <div>
        <h2>Sign Up</h2>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
