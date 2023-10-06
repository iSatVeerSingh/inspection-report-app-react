import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import { useEffect, useRef } from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  const match = useMatch("/");

  const isLogin = true;

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    if (Boolean(match)) {
      navigate("/jobs");
      return;
    }
  }, [isLogin]);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Grid
      h="100vh"
      templateColumns={isMobile ? "auto" : "250px auto"}
      bg="app-bg"
    >
      {isMobile ? (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      ) : (
        <Sidebar />
      )}
      {isMobile && (
        <Button ref={btnRef} onClick={onOpen}>
          Open
        </Button>
      )}
      <Outlet />
    </Grid>
  );
};

export default RootLayout;
