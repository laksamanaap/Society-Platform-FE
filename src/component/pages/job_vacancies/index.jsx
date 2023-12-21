import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import client from "../../../utils/router";

const Index = () => {
  const [vacanciesData, setVacanciesData] = useState([]);
  const [societiesData, setSociestiesData] = useState([]);
  // const [hasApplied, setHasApplied] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applying data
        const applyingResponse = await client.get("/v1/job_vacancies");

        const vacanciesDataArray = applyingResponse?.data?.vacancies;
        setVacanciesData(vacanciesDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSocietiesData = async () => {
      try {
        // Fetch societies response for handling applying jobs only can be once
        const societiesResponse = await client.get("/v1/applications");

        const societiesResponseData = societiesResponse?.data?.vacancies;
        console.log(societiesResponseData);
        setSociestiesData(societiesResponseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSocietiesData();
    fetchData();
  }, []);

  console.log("Vacancies Data : ", vacanciesData);
  console.log("Societies Data : ", societiesData);

  const society_id = societiesData[0]?.society_id;
  console.log(society_id);

  return (
    <div>
      <main>
        <header class="jumbotron">
          <div class="container">
            <h1 class="display-4">Job Vacancies </h1>
          </div>
        </header>

        <div class="container mb-5">
          <div class="section-header mb-4">
            <h4 class="section-title text-muted font-weight-normal">
              List of Job Vacancies
            </h4>
          </div>

          <div class="section-body">
            {vacanciesData.length > 0
              ? vacanciesData.map((vacancy, index) => (
                  <article class="spot">
                    <div class="row">
                      <div class="col-5">
                        <h5 class="text-primary">{vacancy?.company}</h5>
                        <span class="text-muted">{vacancy?.address}</span>
                      </div>
                      <div class="col-4">
                        <h5>
                          Available Position (
                          {vacancy.available_position.reduce(
                            (accumulator, position) =>
                              accumulator + position.capacity,
                            0
                          )}
                          )
                        </h5>
                        <span class="text-muted">
                          {vacancy.available_position.map((position, index) => (
                            <span key={index}>
                              {position.position} ({position.capacity})&nbsp;
                            </span>
                          ))}
                        </span>
                      </div>
                      <div class="col-3">
                        {society_id ? (
                          <>
                            <div
                              class="bg-success text-white p-2 disabled"
                              style={{ opacity: 0.5 }}
                            >
                              Vacancies have been submitted
                            </div>
                          </>
                        ) : (
                          <a
                            href={`/job_vacancies/show/${vacancy?.id}`}
                            className="btn btn-danger btn-lg btn-block"
                          >
                            Detail / Apply
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              : "There's no vacancies data available"}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
