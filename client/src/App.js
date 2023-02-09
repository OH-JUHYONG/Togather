import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={Auth(LandingPage, null, true)} />
      <Route exact path="/login" element={Auth(LoginPage, false)} />
      <Route exact path="/register" element={Auth(RegisterPage, false)} />
    </Routes>
  );
}

export default App;
