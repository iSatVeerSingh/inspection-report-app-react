import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    "app-bg": "#F0F0F6",
    "main-bg": "#FFFFFF",
    "rich-black": "#0D0D26",
    "main-text": "#505050",
    "blue-primary": "#0B8AD9"
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
