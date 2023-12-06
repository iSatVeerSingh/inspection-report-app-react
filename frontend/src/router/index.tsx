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
import AllAddedItems from "../pages/Jobs/AllAddedItems";
import ItemPreview from "../pages/Jobs/ItemPreview";
import InspectionItemLayout from "../Layout/InspectionItemLayout";
import ReportPreview from "../pages/Jobs/ReportPreview";
import Users from "../pages/Users/Users";
import LibraryItems from "../pages/Library/LibraryItems";
import LibraryItem from "../pages/Library/LibraryItem";

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
      {
        path: Routes.ALL_ADDED_ITEMS,
        element: <InspectionItemLayout />,
        children: [
          {
            index: true,
            element: <AllAddedItems />,
          },
          {
            path: Routes.ITEM_PREVIEW,
            element: <ItemPreview />,
          },
        ],
      },
      {
        path: Routes.REPORT_PREVIEW,
        element: <ReportPreview />,
      },
      {
        path: Routes.USERS,
        element: <Users />,
      },
      {
        path: Routes.LIBRARY_ITEMS,
        element: <LibraryItems />,
      },
      {
        path: Routes.LIBRARY_ITEM_VIEW,
        element: <LibraryItem />,
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
