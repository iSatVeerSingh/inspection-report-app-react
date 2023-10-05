import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RootLayout from "../Layout/RootLayout";
import Jobs from "../pages/Jobs/Jobs";
import * as Routes from "./paths";
import Reports from "../pages/Reports";

const router = createBrowserRouter([
  {
    path: Routes.ROOT,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Jobs />,
      },
      {
        path: Routes.REPORTS,
        element: <Reports />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
