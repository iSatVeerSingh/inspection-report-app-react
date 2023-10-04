import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const RootLayout = () => {
  return (
    <Grid h="100vh" templateColumns="250px auto" bg="app-bg">
      <GridItem bg="main-bg" borderRight="stroke">
        <Sidebar />
      </GridItem>
      <GridItem>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default RootLayout;
