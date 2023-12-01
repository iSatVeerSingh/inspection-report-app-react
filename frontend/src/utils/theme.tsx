import { extendTheme, defineStyle, defineStyleConfig } from "@chakra-ui/react";

const simple = defineStyle({
  background: "none",
  padding: 0,
  height: "auto",
  width: "auto",
  border: "none",
});

const iconButtonTheme = defineStyleConfig({
  variants: { simple },
});

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
    "text-bg": "#F7F7F7",
    "secondary-bg": "#F3F6F9",
    // "stroke": "#E0E0E0"
  },
  borders: {
    stroke: "1px solid #E0E0E0",
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Button: iconButtonTheme,
  },
});

export default theme;
