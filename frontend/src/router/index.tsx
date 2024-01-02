import { createBrowserRouter } from "react-router-dom";
import * as paths from "./paths";
import Login from "../pages/Login";

export default createBrowserRouter([
  {
    id: "root",
    path: paths.ROOT,
    element: <h1>root element</h1>,
  },
  {
    path: paths.JOBS,
    element: <h1>jobs element</h1>,
  },
  {
    path: paths.LIBRARY_ITEMS,
    element: <h1>root element</h1>,
  },
  {
    path: paths.INSPECTION_NOTES,
    element: <h1>root element</h1>,
  },
  {
    path: paths.USERS,
    element: <h1>root element</h1>,
  },
  {
    path: paths.SETTINGS,
    element: <h1>seetings </h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/init",
    element: <h1>init</h1>,
  },
]);

// import { createBrowserRouter } from "react-router-dom";
// import Dashboard, { dashboardLoader } from "../Layout/Dashboard";
// import Jobs from "../pages/Jobs/Jobs";
// import * as Routes from "./paths";
// import Init, { initLoader } from "../pages/Init";

// import Login from "../pages/Login";
// import NewJob from "../pages/Jobs/NewJob";
// import JobDetails from "../pages/Jobs/JobDetails";
// import AddInspectionNotes from "../pages/Jobs/AddInspectionNotes";
// import AddInspectionItems from "../pages/Jobs/AddInspectionItems";
// import ViewAddedItems from "../pages/Jobs/ViewAddedItems";
// import ItemPreview from "../pages/Jobs/ItemPreview";
// import InspectionItemLayout from "../Layout/InspectionItemLayout";
// import ReportPreview from "../pages/Jobs/ReportPreview";
// import Users from "../pages/Users/Users";
// import LibraryItems from "../pages/Library/LibraryItems";
// import LibraryItem from "../pages/Library/LibraryItem";
// import NewLibraryItem from "../pages/Library/NewLibraryItem";
// import ErrorNotFound from "../pages/ErrorNotFound";
// import LibraryItemCategories from "../pages/Library/LibraryItemCategories";
// import InspectionNotes from "../pages/InspectionNotes";
// import ViewAddedNotes from "../pages/Jobs/ViewAddedNotes";

// const router = createBrowserRouter([
//   {
//     id: "root",
//     path: Routes.ROOT,
//     loader: dashboardLoader,
//     element: <Dashboard />,
//     errorElement: <ErrorNotFound />,
//     children: [
//       {
//         path: Routes.JOBS,
//         element: <Jobs />,
//       },
//       // {
//       //   path: Routes.NEW_JOB,
//       //   element: <NewJob />,
//       // },
//       {
//         path: Routes.JOBS_DETAILS,
//         element: <JobDetails />,
//       },
//       {
//         path: Routes.ADD_INSPECTION_NOTES,
//         element: <AddInspectionNotes />,
//       },
//       {
//         path: Routes.ALL_ADDED_NOTES,
//         element: <ViewAddedNotes />,
//       },
//       {
//         path: Routes.ADD_INSPECTION_ITEMS,
//         element: <AddInspectionItems />,
//       },
//       {
//         path: Routes.ALL_ADDED_ITEMS,
//         element: <ViewAddedItems />,
//       },
//       {
//         path: Routes.ITEM_PREVIEW,
//         element: <ItemPreview />,
//       },
//       // {
//       //   path: Routes.ALL_ADDED_ITEMS,
//       //   element: <InspectionItemLayout />,
//       //   children: [
//       //     {
//       //       index: true,
//       //       element: <AllAddedItems />,
//       //     },
//       //     {
//       //       path: Routes.ITEM_PREVIEW,
//       //       element: <ItemPreview />,
//       //     },
//       //   ],
//       // },
//       // {
//       //   path: Routes.REPORT_PREVIEW,
//       //   element: <ReportPreview />,
//       // },
//       // {
//       //   path: Routes.USERS,
//       //   element: <Users />,
//       // },
//       // {
//       //   path: Routes.LIBRARY_ITEM_CATEGORIES,
//       //   element: <LibraryItemCategories />,
//       // },
//       // {
//       //   path: Routes.LIBRARY_ITEMS,
//       //   element: <LibraryItems />,
//       // },
//       // {
//       //   path: Routes.LIBRARY_ITEM_VIEW,
//       //   element: <LibraryItem />,
//       // },
//       // {
//       //   path: Routes.NEW_LIBRARY_ITEM,
//       //   element: <NewLibraryItem />,
//       // },
//       // {
//       //   path: Routes.INSPECTION_NOTES,
//       //   element: <InspectionNotes />,
//       // },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/init",
//     loader: initLoader,
//     element: <Init />,
//   },
// ]);

// export default router;
