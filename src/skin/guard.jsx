import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const GuardSkin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // If token exists, user is logged in true
  const society_name = localStorage.getItem("society_name");
  console.log(society_name);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("society_name");

    setIsLoggedIn(false);
    navigate("/");
  };

  // if (!isLoggedIn) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/dashboard">
            Job Seekers Platform
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {society_name}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <footer>
        <div className="container">
          <div className="text-center py-4 text-muted">
            Copyright &copy; 2023 - Web Tech ID
          </div>
        </div>
      </footer>
    </div>
  );
};
