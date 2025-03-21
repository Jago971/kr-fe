// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/Auth";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import CoreLayout from "./layouts/core";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
          {/* Auth routes inside AuthLayout */}
          <Route path="kind-remind/login" element={<AuthLayout />}>
            <Route index element={<LogIn />} />
          </Route>
          <Route path="kind-remind/signup" element={<AuthLayout />}>
            <Route index element={<SignUp />} />
          </Route>
          
          {/* Core App inside CoreLayout */}
          <Route path="kind-remind" element={<CoreLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
