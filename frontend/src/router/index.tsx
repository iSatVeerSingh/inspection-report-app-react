import { createBrowserRouter, redirect } from "react-router-dom";
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
import AllAddedItems from "../pages/Jobs/AllAddedItems";
import ItemPreview from "../pages/Jobs/ItemPreview";
import AddItemPreviousReport from "../pages/Jobs/AddItemPreviousReport";
import { getLoginStatus, isInitDone } from "../services/auth";
import Init from "../pages/Init";

const router = createBrowserRouter([
  {
    id: "root",
    path: Routes.ROOT,
    loader() {
      const isLogin = getLoginStatus();
      if (!isLogin) {
        return redirect("/login");
      }
      return null;
    },
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
      {
        path: Routes.ALL_ADDED_ITEMS,
        element: <AllAddedItems />,
      },
      {
        path: Routes.ITEM_PREVIEW,
        element: <ItemPreview />,
      },
      {
        path: Routes.PREVIOUS_REPORT_ITEMS,
        element: <AddItemPreviousReport />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/init",
    async loader() {
      const isLogin = getLoginStatus();
      if (!isLogin) {
        return redirect("/login");
      }
      const isExist = await isInitDone();
      if (isExist) {
        return redirect("/jobs");
      }
      return null;
    },
    element: <Init />,
  },
]);

export default router;
