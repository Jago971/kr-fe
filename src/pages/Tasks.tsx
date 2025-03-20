import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../layouts/Base";

const Tasks: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3002/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send the access token
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.newAccessToken)
            localStorage.setItem("accessToken", data.newAccessToken);
          setIsAuthenticated(true);
          setUserId(data.userId);
          console.log("data", data);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <BaseLayout>
      <div>Welcome to the Tasks Page, user {userId}</div>
    </BaseLayout>
  );
};

export default Tasks;
