import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RootLayout from "../Layout/RootLayout";
import Jobs from "../pages/Jobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Jobs />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router;