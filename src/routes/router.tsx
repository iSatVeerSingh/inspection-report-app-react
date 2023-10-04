import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RootLayout from "../Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>This is index page</h1>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router;