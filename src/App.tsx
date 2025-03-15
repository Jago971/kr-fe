// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;