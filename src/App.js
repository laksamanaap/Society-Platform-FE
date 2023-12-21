import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/css/custom.css";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
// import Dashboard from "./component/pages/dashboard/index";
import RequestValidation from "./component/pages/data_validation/index";
import JobVacancies from "./component/pages/job_vacancies/index";
import JobVacanciesDetail from "./component/pages/job_vacancies/show";
import Login from "./component/pages/Login";

function App() {
  return (
    <>
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data_validation" element={<RequestValidation />} />
          <Route path="/job_vacancies" element={<JobVacancies />} />
          <Route
            path="/job_vacancies/show/:id"
            element={<JobVacanciesDetail />}
          />
        </Routes>
        <Footer />
      </Router> */}
    </>
  );
}

export default App;
