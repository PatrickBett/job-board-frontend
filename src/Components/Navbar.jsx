import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-sm   ">
        <div className="container-fluid ">
          <Link className="navbar-brand fw-bolder " to="/">
            Mega-Jobs
          </Link>

          <button
            type="button"
            className="navbar-toggler bg-light "
            data-bs-target="#collapsibleNavbar"
            data-bs-toggle="collapse"
          >
            <span className="navbar-toggler-icon bg-light"></span>
          </button>

          {/* target */}
          <div className="collapse navbar-collapse mx-5" id="collapsibleNavbar">
            {/* ms-auto */}
            <ul className="navbar-nav ms-auto ">
              {isLoggedIn ? (
                <>
                  <li className="nav-item me-5">
                    <Link className="nav-link fw-bolder fs-5 " to="/jobs">
                      Job Listing
                    </Link>
                  </li>

                  <li className="nav-item me-5">
                    <Link className="nav-link fw-bolder fs-5 " to="/community">
                      Community
                    </Link>
                  </li>

                  <li className="nav-item dropdown me-3">
                    <Link
                      className="nav-link dropdown-toggle "
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <img
                        src="https://st5.depositphotos.com/36741118/67793/i/380/depositphotos_677933158-stock-photo-older-european-man-good-mood.jpg"
                        className="rounded-circle img-fluid custom-size"
                      ></img>
                    </Link>
                    <ul className="dropdown-menu  border-0 ">
                      <li className="nav-item ">
                        <Link className="nav-link fs-6 fw-bolder  " to="">
                          profile
                        </Link>
                      </li>
                      <li className="nav-item" id="profile">
                        <Link
                          className="nav-link fs-6 fw-bolder "
                          to="/logout"
                          onClick={onLogout}
                        >
                          logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bolder" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bolder" to="/login">
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
