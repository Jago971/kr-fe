// Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHomeData } from "../services/home";
import { KindRemindResponse } from "../types/KindRemindResponse";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<KindRemindResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const response = await fetchHomeData();

        if (response) {
          if (response.redirect) {
            // Redirect if the response indicates so
            navigate("/kind-remind/login");
          } else {
            // Set data if successful
            setData(response);
          }
        }
      } catch (error) {
        setError("An error occurred while fetching home data.");
        console.error(error);
      }
    };

    loadHomeData();
  }, [navigate]);

  return (
    <div>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
