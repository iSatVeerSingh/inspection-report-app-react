import { createBrowserRouter, redirect } from "react-router-dom";
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
import { getInitStatus } from "../services/auth";
import Init from "../pages/Init";
import InspectionJobLayout from "../Layout/InspectionJobLayout";
import { getRequest } from "../services/client";

const router = createBrowserRouter([
  {
    id: "root",
    path: Routes.ROOT,
    async loader() {
      const isInit = await getInitStatus();
      if (!isInit) {
        return redirect("/init");
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
        path: Routes.JOBS_DETAILS,
        element: <JobDetails />,
      },
      {
        path: Routes.JOB_SUMMARY,
        element: <InspectionJobLayout />,
        async loader({ params }) {
          console.log("this is called")
          const response = await getRequest(
            `/client/inspections?inspectionId=${params.inspectionId}`
          );

          return response;
        },

        children: [
          {
            index: true,
            element: <JobSummary />,
          },
          {
            path: Routes.ADD_INSPECTION_NOTES,
            element: <AddInspectionNotes />,
          },
        ],
      },
      {
        path: Routes.CUSTOM_JOB,
        element: <CreateCustomJob />,
      },
      {
        path: Routes.REPORTS,
        element: <Reports />,
      },
    ],
  },
  {
    path: "/init",
    async loader() {
      const isInit = await getInitStatus();
      if (isInit) {
        return redirect("/jobs");
      }
      return null;
    },
    element: <Init />,
  },
]);

export default router;
