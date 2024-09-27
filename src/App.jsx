import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "./constants";
import Community from "./Components/Community";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="jobs"
            element={
              <Protected setIsLoggedIn={setIsLoggedIn}>{<Home />}</Protected>
            }
          />
          <Route
            path="community"
            element={
              <Protected setIsLoggedIn={setIsLoggedIn}>
                {<Community />}
              </Protected>
            }
          />
          <Route path="logout" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
