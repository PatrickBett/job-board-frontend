import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username, password });
      const token = res.data.access;
      localStorage.clear();
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      setIsLoggedIn(true);
      navigate("/jobs");
    } catch (error) {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Sign In</h3>

      <form className="shadow rounded mt-5 px-5 py-4" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Enter Username
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        Don't have an Account yet? <Link to="/register">Sign up Here</Link>
      </div>
    </div>
  );
}

export default Login;
