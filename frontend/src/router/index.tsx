import { createBrowserRouter } from "react-router-dom";
import RootLayout, { rootLoader } from "../Layout/RootLayout";
import Jobs from "../pages/Jobs/Jobs";
import * as Routes from "./paths";
import Init, { initLoader } from "../pages/Init";

import Login from "../pages/Login";
import NewJob from "../pages/Jobs/NewJob";
import JobDetails from "../pages/Jobs/JobDetails";
import JobSummary from "../pages/Jobs/JobSummary";
import AddInspectionNotes from "../pages/Jobs/AddInspectionNotes";
import AllAddedNotes from "../pages/Jobs/AllAddedNotes";
import AddInspectionItems from "../pages/Jobs/AddInspectionItems";

const router = createBrowserRouter([
  {
    id: "root",
    path: Routes.ROOT,
    loader: rootLoader,
    element: <RootLayout />,
    children: [
      {
        path: Routes.JOBS,
        element: <Jobs />,
      },
      {
        path: Routes.NEW_JOB,
        element: <NewJob />,
      },
      {
        path: Routes.JOBS_DETAILS,
        element: <JobDetails />,
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
        path: Routes.ALL_ADDED_NOTES,
        element: <AllAddedNotes />,
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
  {
    path: "/init",
    loader: initLoader,
    element: <Init />,
  },
]);

export default router;
