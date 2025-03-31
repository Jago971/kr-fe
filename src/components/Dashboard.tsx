import { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboard";
import { KindRemindResponse } from "../types/KindRemindResponse";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  activeComponent: "tasks" | "messages" | "home";
}

const Dashboard = ({ activeComponent }: DashboardProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<KindRemindResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollComponent = () => {
    switch (activeComponent) {
      case "tasks":
        return "translate-x-[-33.33%]";
      case "messages":
        return "translate-x-[-66.66%]";
      default:
        return "translate-x-[0%]";
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchDashboardData();
        if (response) {
          setData(response);
        }
      } catch (error) {
        setError("An error occurred while fetching home data.");
        console.error(error);
        navigate("/kind-remind/login");
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="border border-amber-600 h-full overflow-hidden">
      <div
        className={`w-[300%] border h-full border-b-blue-500 flex transition-transform duration-300 ${scrollComponent()}`}
      >
        <div className="w-1/3 flex items-center justify-center">Home</div>
        <div className="w-1/3 flex items-center justify-center">Tasks</div>
        <div className="w-1/3 flex items-center justify-center">Messages</div>
      </div>
    </div>
  );
};

export default Dashboard;
