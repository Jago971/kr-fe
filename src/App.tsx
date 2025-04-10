// src/App.tsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import CrudLayout from "./layouts/Crud";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth routes inside AuthLayout */}
          <Route path="kind-remind/" element={<AuthLayout />}>
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Core App inside DashboardLayout */}
          <Route path="kind-remind/dashboard" element={<DashboardLayout />} />

          {/* Grouped Crud pages inside CrudLayout */}
          <Route path="kind-remind/" element={<CrudLayout />}>
            <Route path="profile" element={<Profile />} />
            {/* <Route path="tasks" element={<Tasks />} />
            <Route path="messages" element={<Messages />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
