import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/auth";

const VerifyEmail: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setError(null);
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const response = await verifyEmail({ token: token as string });
        if (response && response.status === "success") {
          setResponseMessage(response.message);
          setIsVerified(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    verifyToken();
  }, [location]);

  useEffect(() => {
    if (responseMessage) alert(responseMessage);
  }, [responseMessage]);

  return (
    <>
      <h1 className="p-2 md:p-1 text-center w-full max-w-md text-3xl md:text-xl border-b-2 border-neutral-800 text-neutral-800">
        Verify Email
      </h1>

      <div className="text-center text-neutral-800 md:text-xs">
        {!isVerified ? (
          <p>Verifying email...</p>
        ) : (
          <p>
            Email verified! You can now {""}
            <Link to="/kind-remind/login" className="underline cursor-pointer">
              login here
            </Link>
          </p>
        )}
      </div>

      {error && <p className="text-center text-red-500 md:text-xs">{error}</p>}
    </>
  );
};

export default VerifyEmail;
