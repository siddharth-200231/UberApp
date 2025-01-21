import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtected from "./pages/UserProtected";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/User-login" element={<UserLogin />} />
      <Route path="/User-signup" element={<UserSignup />} />
      <Route path="/Captain-Signup" element={<CaptainSignup />} />
      <Route path="/Captain-login" element={<CaptainLogin />} />
      <Route
        path="/home"
        element={
          <UserProtected>
            <Home />
          </UserProtected>
        }
      />
    </Routes>
  );
};

export default App;
