import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3002/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUserId(data.userId);
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

  return <div>Welcome to the Home Page, user {userId}</div>;
};

export default Home;
