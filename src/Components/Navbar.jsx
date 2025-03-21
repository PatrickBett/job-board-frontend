import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Mega-Jobs</span>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-bs-target="#collapsibleNavbar"
          data-bs-toggle="collapse"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/community">
                    Community
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>

                <Link
                        className="dropdown-item logout-item"
                        to="/logout"
                        onClick={onLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                </Link>

                
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link sign-up-btn" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link sign-in-btn" to="/login">
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;