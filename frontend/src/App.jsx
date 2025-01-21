import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtected from "./pages/UserProtected";
import UserLogout from "./pages/UserLogout";
import CaptainProtected from "./pages/CaptainProtected";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";

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
      <Route
        path="Captain-home"
        element={
          <CaptainProtected>
            <CaptainHome />
          </CaptainProtected>
        }
      />
      <Route
        path="/user/logout"
        element={
          <UserProtected>
            <UserLogout />
          </UserProtected>
        }
      />
      <Route
        path="/Captain-logout"
        element={
          <CaptainProtected>
            <CaptainLogout />
          </CaptainProtected>
        }
      />
    </Routes>
  );
};

export default App;
