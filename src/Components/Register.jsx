import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("api/user/register/", {
        username,
        email,
        firstname,
        lastname,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError("Provide all input fields");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h3 className="text-center">Sign Up</h3>
        <form
          className="shadow rounded mt-2 px-5 py-4"
          onSubmit={handleRegister}
        >
          <div className="mb-1">
            <label htmlFor="firstname" className="form-label">
              Enter First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="lastname" className="form-label">
              Enter Last Name
            </label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>

          <div className="mb-1">
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
          <div className="mb-1">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">
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
          <button className="btn btn-primary" type="submit">
            SignUp
          </button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        Already have an account? <Link to="/login">Sign in Here</Link>
      </div>
    </>
  );
}

export default Register;
