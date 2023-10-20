"use client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  if (typeof navigator.storage !== undefined) {
    navigator.storage.persisted().then((isPer) => {
      console.log({isPer})
      if (!isPer) {
        navigator.storage.persist().then((isAllow) => console.log(isAllow));
      } else {
        console.log("already allower");
      }
    });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
      { type: import.meta.env.MODE === "production" ? "classic" : "module" }
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
