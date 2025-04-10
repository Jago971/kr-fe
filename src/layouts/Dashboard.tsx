import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import Dashboard from "../components/Dashboard";
import { KindRemindResponse } from "../types/KindRemindResponse";
import { fetchDashboardData } from "../services/dashboard";
import { useNavigate } from "react-router-dom";
import { fetchProfileData } from "../services/profile";

const DashboardLayout: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "tasks" | "messages">(
    "home"
  );

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<KindRemindResponse | null>(null);
  const [profileData, setProfileData] = useState<KindRemindResponse | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchDashboardData();
        if (response) {
          setDashboardData(response);
        }
      } catch (error) {
        console.error(error);
        navigate("/kind-remind/login");
      }
    };
    const loadProfileData = async () => {
      try {
        const response = await fetchProfileData();
        if (response) {
          setProfileData(response);
        }
      } catch (error) {
        console.error(error);
        navigate("/kind-remind/login");
      }
    };

    loadDashboardData();
    loadProfileData();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-4 gap-4 bg-orange-100">
      {profileData ? <Header data={profileData.data.payload} /> : null}
      <main className="border h-full w-full max-w-md">
      {dashboardData ? <Dashboard activeComponent={currentPage} data={dashboardData?.data.payload} /> : null}
        
      </main>
      <Nav handleClick={setCurrentPage} activeComponent={currentPage}></Nav>
    </div>
  );
};

export default DashboardLayout;
