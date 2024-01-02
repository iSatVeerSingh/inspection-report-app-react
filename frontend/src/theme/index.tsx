import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    "app-bg": "#F0F0F6",
    "main-bg": "#FFFFFF",
    main: {
      500: "#667085",
      600: "#4D5464",
      700: "#333843",
      800: "#1A1C21",
    },
    primary: {
      50: "#EFEFFD",
      100: "#DEDEFA",
      500: "#5C59E8",
      600: "#4543AE",
    },
    neutral: {
      50: "#F4F7FE",
    },

    // "main-bg-light": "#F4F7FE",

    // "text-main": "#120f43",
    // "text-secondary": "#4A5568",
    // "text-alt": "#8F9BBA",
    // "alt-bg": "#4B49AC",
  },
  borders: {
    stroke: "1px solid #C2C6CE",
  },
});
