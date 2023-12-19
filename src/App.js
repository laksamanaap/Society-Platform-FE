import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/custom.css";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import Dashboard from "./component/pages/dashboard/index";
import RequestValidation from "./component/pages/data_validation/index";
import JobVacancies from "./component/pages/job_vacancies/index";
import JobVacanciesDetail from "./component/pages/job_vacancies/show";
import Login from "./component/pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/data_validation" element={<RequestValidation />} />
          <Route path="/job_vacancies" element={<JobVacancies />} />
          <Route path="/job_vacancies/show" element={<JobVacanciesDetail />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
