import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Init from "../pages/Init";

export default createBrowserRouter([
  {
    path: "/",
    element: "dls"
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/init",
    element: <Init />
  }
]);
