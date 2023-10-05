import { Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const RootLayout = () => {
  return (
    <Grid h="100vh" templateColumns="250px auto" bg="app-bg">
      <Sidebar />
      <Outlet />
    </Grid>
  );
};

export default RootLayout;
