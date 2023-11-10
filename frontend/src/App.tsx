"use client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GlobalContext } from "./services/client/context";
import { useState } from "react";
// import { useEffect } from "react";

const App = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
      { type: import.meta.env.MODE === "production" ? "classic" : "module" }
    );

    // navigator.serviceWorker.addEventListener("message", (e) => {
    //   console.log(e);
    // });
  }

  const [isOffline, setIsOffline] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // navigator.serviceWorker.controller?.postMessage("hello satu")
  //     fetch("/hello")
  //       .then((res) => res.text())
  //       .then((res) => console.log(res));
  //   }, 15000);
  // }, []);
  return (
    <GlobalContext.Provider value={{ isOffline, setIsOffline }}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
};

export default App;
