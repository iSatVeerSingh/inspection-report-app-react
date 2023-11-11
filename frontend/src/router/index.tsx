import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout, { rootLoader } from "../Layout/RootLayout";
import Jobs from "../pages/Jobs/Jobs";
import * as Routes from "./paths";
import { getInitStatus } from "../services/auth";
import Init, { initLoader } from "../pages/Init";

import Login from "../pages/Login";

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
