import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RootLayout from "../Layout/RootLayout";
import Jobs from "../pages/Jobs/Jobs";
import * as Routes from "./paths";
import Reports from "../pages/Reports";
import JobDetails from "../pages/Jobs/JobDetails";
import CreateCustomJob from "../pages/Jobs/CreateCustomJob";
import JobSummary from "../pages/Jobs/JobSummary";
import AddInspectionNotes from "../pages/Jobs/AddInspectionNotes";
import AddInspectionItems from "../pages/Jobs/AddInspectionItems";

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
      {
        path: Routes.JOB_SUMMARY,
        element: <JobSummary />,
      },
      {
        path: Routes.ADD_INSPECTION_NOTES,
        element: <AddInspectionNotes />,
      },
      {
        path: Routes.ADD_INSPECTION_ITEMS,
        element: <AddInspectionItems />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
