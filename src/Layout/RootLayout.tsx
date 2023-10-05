import { Grid } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import { useEffect } from "react";

const RootLayout = () => {
  const navigate = useNavigate();

  const isLogin = true;

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  return (
    <Grid h="100vh" templateColumns="250px auto" bg="app-bg">
      <Sidebar />
      <Outlet />
    </Grid>
  );
};

export default RootLayout;
