"use client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
      { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
    )
  }

  return <RouterProvider router={router} />;
};

export default App;
