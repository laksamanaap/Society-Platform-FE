import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Index() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Token From Data Validation", token);

  const [vacanciesData, setVacanciesData] = useState([]);
  const [formData, setFormData] = useState({
    job_category_id: "1",
    job_position: "",
    work_experience: "",
    reason_accepted: "",
    validator_id: "1",
    status: "accepted",
    validator_notes: "siap jadi developer unicorn",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const storeValidation = async () => {
    try {
      const {
        job_category_id,
        job_position,
        work_experience,
        reason_accepted,
        validator_id,
        status,
        validator_notes,
      } = formData;

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/validations",
        {
          job_category_id: job_category_id,
          job_position: job_position,
          work_experience: work_experience,
          reason_accepted: reason_accepted,
          validator_id: validator_id,
          status: status,
          validator_notes: validator_notes,
        },
        {
          params: {
            token: `${token}`,
          },
        }
      );

      setSuccessMessage("Request data validation successful");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  const handleStore = (e) => {
    e.preventDefault();
    storeValidation();
  };

  console.log(formData);

  return (
    <>
      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Request Data Validation</h1>
          </div>
        </header>

        <div className="container">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">
              Error: {errorMessage.message} ({errorMessage.code})
            </div>
          )}
          <form onSubmit={handleStore}>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="d-flex align-items-center mb-3">
                    <label className="mr-3 mb-0">Job Category</label>
                    <select
                      className="form-control-sm"
                      name="job_category_id" //
                      value={formData.job_category_id} //
                      onChange={handleInputChange}
                    >
                      <option name="Computing" value="1">
                        Computing and ICT
                      </option>
                      <option name="Construction" value="2">
                        Construction and building
                      </option>
                      <option name="Animals" value="3">
                        Animals, land and environment
                      </option>
                      <option name="Design" value="4">
                        Design, arts and crafts
                      </option>
                      <option name="Education" value="5">
                        Education and training
                      </option>
                    </select>
                  </div>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    placeholder="Job position sparate with , (comma)"
                    name="job_position"
                    value={formData.job_position}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="d-flex align-items-center mb-3">
                    <label className="mr-3 mb-0">Work Experiences ?</label>
                    <select className="form-control-sm">
                      <option value="yes">Yes, I have</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    placeholder="Describe your work experiences"
                    name="work_experience"
                    value={formData.work_experience}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <div className="d-flex align-items-center mb-3">
                    <label className="mr-3 mb-0">Reason Accepted</label>
                  </div>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="6"
                    placeholder="Explain why you should be accepted"
                    name={"reason_accepted"}
                    value={formData.reason_accepted}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              Send Request
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Index;
