// src/App.tsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoreLayout from "./layouts/Core";
import LoadingScreen from "./components/loadingScreen";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layouts/Auth";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </Router>
  );
};

export default App;
