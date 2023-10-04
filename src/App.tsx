"use client";

import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import router from "./routes/router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
