import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    id_card_number: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [userData, setUserData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("Input Name : ", name);
    // console.log("Input Value : ", value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Fetch Login
  const fetchLogin = async () => {
    try {
      const { idCardNumber, password } = formData;

      const { data } = await axios
        .post("http://127.0.0.1:8000/api/v1/auth/login", {
          id_card_number: idCardNumber,
          password: password,
        })
        .then(({ data }) => {
          console.log(data);

          // Set Society Name
          localStorage.setItem("society_name", data?.name);
          // Set Token
          localStorage.setItem("token", data?.token);
          setUserData(data);
          setIsLoggedIn(true);

          // When success redirect to dashboard
          navigate("/dashboard");
        });
    } catch (error) {
      console.error("Error fetching login:", error);
      setErrorMessage("ID Card Number or Password incorrect");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.idCardNumber && formData.password) {
      fetchLogin();
    } else {
      setErrorMessage("ID Card Number and Password are required");
    }
  };

  // Call fetch login when form is submitted
  useEffect(() => {
    if (formData.idCardNumber && formData.password) {
      fetchLogin();
    }
  }, []);

  return (
    <div>
      <main>
        <header className="jumbotron">
          <div className="container text-center">
            <h1 className="display-4">Job Seekers Platform</h1>
          </div>
        </header>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card card-default" onSubmit={handleLogin}>
                <div className="card-header">
                  <h4 className="mb-0">Login</h4>
                </div>
                <div className="card-body">
                  {errorMessage && (
                    <div className="alert alert-danger">
                      Error: {errorMessage}
                    </div>
                  )}
                  <div className="form-group row align-items-center">
                    <div className="col-4 text-right">ID Card Number</div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        name="idCardNumber"
                        value={formData.idCardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center">
                    <div className="col-4 text-right">Password</div>
                    <div className="col-8">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row align-items-center mt-4">
                    <div className="col-4"></div>
                    <div className="col-8">
                      <button className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
