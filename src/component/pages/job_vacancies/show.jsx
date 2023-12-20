import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Show() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(id);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [vacanciesData, setVacanciesData] = useState([]);
  const [formData, setFormData] = useState({
    positions: [],
    vacancy_id: id,
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch detail vacancies
        const vacanciesDetailResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/job_vacancies/${id}`,
          {
            params: {
              token: `${token}`,
            },
          }
        );

        // console.log(vacanciesDetailResponse?.data?.vacancy);
        const vacanciesDataArray = vacanciesDetailResponse?.data?.vacancy;
        setVacanciesData(vacanciesDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const storeApplication = async () => {
    try {
      const { positions, notes, vacancy_id } = formData;

      const { data } = axios.post(
        "http://127.0.0.1:8000/api/v1/applications",
        {
          positions: positions,
          vacancy_id: vacancy_id,
          notes: notes,
        },
        {
          params: {
            token: `${token}`,
          },
        }
      );

      console.log("Application Data : ", data);
      setSuccessMessage("Request job application successful");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErrorMessage(error);
      console.error(error);
    }
  };

  const handleStore = (e) => {
    e.preventDefault();
    storeApplication();
  };

  console.log("Vacancies Detail Data : ", vacanciesData);

  const handleFileInputChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          positions: [...prevFormData.positions, name],
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const renderTableRows = () => {
    if (!vacanciesData.available_position) {
      console.log("data is empty");
      return null;
    }

    return vacanciesData.available_position.map((position, index) => (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            id={`checkbox_${position.id}`}
            name={`${position.position}`}
            onChange={handleFileInputChange}
          />
        </td>
        <td>{position.position}</td>
        <td>{position.capacity}</td>
        <td>{`${position.apply_capacity}/${position.apply_count ?? "-"}`}</td>
      </tr>
    ));
  };

  return (
    <main>
      <header className="jumbotron">
        <div className="container text-center">
          <div>
            <h1 className="display-4">{vacanciesData?.company}</h1>
            <span className="text-muted">{vacanciesData?.address}</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-group">
              <h3>Description</h3>
              {vacanciesData?.description}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-group">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">
                  Error: {errorMessage.message} ({errorMessage.code})
                </div>
              )}
              <h3>Select position</h3>
              <table className="table table-bordered table-hover table-striped">
                <tr>
                  <th width="1">#</th>
                  <th>Position</th>
                  <th>Capacity</th>
                  <th>Application / Max</th>
                  <th rowspan="4" width="1">
                    <a
                      href=""
                      className="btn btn-primary btn-lg"
                      onClick={handleStore}
                    >
                      Apply for this job
                    </a>
                  </th>
                </tr>
                {renderTableRows()}
              </table>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <div className="d-flex align-items-center mb-3">
                <label className="mr-3 mb-0">Notes for Company</label>
              </div>
              <textarea
                className="form-control"
                cols="30"
                rows="6"
                placeholder="Explain why you should be accepted"
                name="notes"
                value={formData.notes}
                onChange={handleFileInputChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Show;
