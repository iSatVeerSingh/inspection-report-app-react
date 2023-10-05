import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    "app-bg": "#F0F0F6",
    "main-bg": "#FFFFFF",
    "rich-black": "#0D0D26",
    "main-text": "#505050",
    "blue-primary": "#0B8AD9",
    "nav-bg": "#DEE0FC",
    "nav-link": "#2B3674",
    "dark-gray": "#2E3A59",
    // "stroke": "#E0E0E0"
  },
  borders: {
    stroke: "1px solid #E0E0E0",
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;
