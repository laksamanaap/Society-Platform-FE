import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { computeHeadingLevel } from "@testing-library/react";
import client from "../../../utils/router";

const Index = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [validationData, setValidationData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);

  const [validationButton, setValidationButton] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch validation data
        const validationResponse = await client.get("/v1/validations");
        const validationDataArray = validationResponse.data.data;
        const validationDataArrayStatus =
          validationResponse.data.data[0]?.status ?? null;

        setValidationButton(validationDataArrayStatus);
        setValidationData(validationDataArray);

        // Fetch applying data
        const applyingResponse = await client.get("/v1/applications");

        console.log(applyingResponse.data.vacancies);
        const applicationDataArray = applyingResponse.data.vacancies;
        setApplicationData(applicationDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatApplyDate = (date) => {
    const dateValue = new Date(date);
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      dateValue
    );
    const dateValueFormatted = `${month} ${dateValue.getDate()}, ${dateValue.getFullYear()}`;
    return dateValueFormatted;
  };

  console.log(validationData);
  console.log(validationButton);
  console.log(applicationData);

  return (
    <>
      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Dashboard</h1>
          </div>
        </header>

        <div className="container">
          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Data Validation</h4>
            </div>
            <div className="row gap-4">
              {validationButton === "pending" ||
              validationButton === "" ||
              validationButton === null ? (
                <div className="col-md-4">
                  <div className="card card-default">
                    <div className="card-header">
                      <h5 className="mb-0">Data Validation</h5>
                    </div>
                    <div className="card-body">
                      <a
                        href="/data_validation"
                        className="btn btn-primary btn-block"
                      >
                        + Request validation
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}

              {validationData.length > 0
                ? validationData.map((validation, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card card-default">
                        <div className="card-header border-0">
                          <h5 className="mb-0">Data Validation</h5>
                        </div>
                        <div className="card-body p-0">
                          <table className="table table-striped mb-0">
                            <tr>
                              <th>Status</th>
                              <td>
                                {validation?.status ? (
                                  <span
                                    className={`badge ${
                                      validation.status.toLowerCase() ===
                                      "accepted"
                                        ? "badge-success"
                                        : "badge-info"
                                    }`}
                                  >
                                    {validation.status}
                                  </span>
                                ) : (
                                  "-"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Job Category</th>
                              <td className="text-muted">
                                {validation?.job_categories?.job_category ??
                                  "-"}
                              </td>
                            </tr>
                            <tr>
                              <th>Job Position</th>
                              <td className="text-muted">
                                {validation?.job_position ?? "-"}
                              </td>
                            </tr>
                            <tr>
                              <th>Reason Accepted</th>
                              <td className="text-muted">
                                {validation?.reason_accepted ?? "-"}
                              </td>
                            </tr>
                            <tr>
                              <th>Validator</th>
                              <td className="text-muted">
                                {validation?.validators?.name ?? "-"}
                              </td>
                            </tr>
                            <tr>
                              <th>Validator Notes</th>
                              <td className="text-muted">
                                {validation?.validator_notes ?? "-"}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))
                : "No Data Available!"}
            </div>
          </section>

          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="section-title text-muted">
                    My Job Applications
                  </h4>
                </div>
                {validationButton === "accepted" ? (
                  <div className="col-md-4">
                    <a
                      href="/job_vacancies"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      + Add Job Applications
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="section-body">
              <div className="row mb-4">
                {validationButton === "pending" || validationButton === null ? (
                  <div className="col-md-12">
                    <div className="alert alert-warning">
                      Your validation must be approved by validator to applying
                      job.
                    </div>
                  </div>
                ) : null}

                {validationButton === "accepted"
                  ? applicationData.length > 0 &&
                    applicationData.map((application, index) => (
                      <div class="col-md-6 mb-5" key={index}>
                        <div class="card card-default">
                          <div class="card-header border-0">
                            <h5 class="mb-0">
                              <a
                                href={`/job_vacancies/show/${application?.id}`}
                              >
                                {application?.company}
                              </a>
                            </h5>
                          </div>
                          <div class="card-body p-0">
                            <table class="table table-striped mb-0">
                              <tr>
                                <th>Address</th>
                                <td class="text-muted">
                                  {application?.address}
                                </td>
                              </tr>
                              <tr>
                                <th>Position</th>
                                <td className="text-muted">
                                  <ul>
                                    {application?.position.length > 0 ? (
                                      application?.position.map(
                                        (job_position, index) => (
                                          <li key={index}>
                                            {job_position.position}&nbsp;
                                            <span className="badge badge-info">
                                              {job_position.apply_status}
                                            </span>
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li>-</li>
                                    )}
                                  </ul>
                                </td>
                              </tr>

                              <tr>
                                <th>Apply Date</th>
                                <td class="text-muted">
                                  {formatApplyDate(application?.apply_date)}
                                </td>
                              </tr>
                              <tr>
                                <th>Notes</th>
                                <td class="text-muted">{application?.notes}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))
                  : "No jobs application data available!"}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
