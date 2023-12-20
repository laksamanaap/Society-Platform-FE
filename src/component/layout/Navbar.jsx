import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [societyName, setSocietyName] = useState(null);

  const token = localStorage.getItem("token");
  console.log(token);

  const checkLoginStatus = () => {
    try {
      const society_name = localStorage.getItem("society_name");
      console.log(society_name);
      if (token) {
        setIsLoggedIn(true);
        setSocietyName(society_name);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [token]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/auth/logout?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          // Clear token and any other relevant data from local storage
          localStorage.removeItem("token");
          localStorage.removeItem("society_name");

          setIsLoggedIn(false);
          setSocietyName(null);
          navigate("/login");
        } else {
          console.error("Logout failed:", response);
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
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

        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {societyName}
                </a>
              </li>
              <li className="nav-item" onClick={handleLogout}>
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
