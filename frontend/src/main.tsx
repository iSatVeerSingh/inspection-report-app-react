// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraBaseProvider } from "@chakra-ui/react";
import "@fontsource/poppins";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  // </React.StrictMode>
);
