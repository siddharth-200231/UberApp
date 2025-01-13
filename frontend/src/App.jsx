import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/User-login" element={<UserLogin />} />
      <Route path="/User-signup" element={<UserSignup />} />
      <Route path="/Captain-Signup" element={<CaptainSignup />} />
      <Route path="/login" element={<}
      <Route path="/Captain-login" element={<CaptainLogin />} />
    </Routes>
  );
};

export default App;
