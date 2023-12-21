import { createBrowserRouter } from "react-router-dom";
import { GuestSkin } from "../skin/guest";
import { GuardSkin } from "../skin/guard";
import Login from "../component/pages/Login";
import Dashboard from "../component/pages/dashboard";
import RequestValidation from "../component/pages/data_validation";
import JobVacancies from "../component/pages/job_vacancies/index";
import JobVacanciesDetail from "../component/pages/job_vacancies/show";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestSkin />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <GuardSkin />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/data_validation",
    element: <GuardSkin />,
    children: [
      {
        path: "/data_validation",
        element: <RequestValidation />,
      },
    ],
  },
  {
    path: "/job_vacancies",
    element: <GuardSkin />,
    children: [
      {
        path: "/job_vacancies",
        element: <JobVacancies />,
      },
    ],
  },
  {
    path: "/job_vacancies/show/:id",
    element: <GuardSkin />,
    children: [
      {
        path: "/job_vacancies/show/:id",
        element: <JobVacanciesDetail />,
      },
    ],
  },
]);

export default routes;
