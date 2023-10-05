import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RootLayout from "../Layout/RootLayout";
import Jobs from "../pages/Jobs/Jobs";
import * as Routes from "./paths";
import Reports from "../pages/Reports";
import JobDetails from "../pages/Jobs/JobDetails";
import CreateCustomJob from "../pages/Jobs/CreateCustomJob";
import Menu from "../pages/Menu";

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <RootLayout />,
    children: [
      {
        path: Routes.JOBS,
        element: <Jobs />,
      },
      {
        path: Routes.REPORTS,
        element: <Reports />,
      },
      {
        path: Routes.JOBS_DETAILS,
        element: <JobDetails />,
      },
      {
        path: Routes.CUSTOM_JOB,
        element: <CreateCustomJob />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/menu",
    element: <Menu />
  }
]);

export default router;
