import {
  // Drawer,
  // DrawerContent,
  // DrawerOverlay,
  Grid,
  // IconButton,
  // useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
import { useEffect } from "react";
import { useGlobalContext } from "../services/client/context";
// import { MenuIcon } from "../icons";
// import useMobile from "../hooks/useMobile";
// import "../workers/workerInit";

const RootLayout = () => {
  const navigate = useNavigate();
  const match = useMatch("/");
  // const {isOffline, setIsOffline}: any = useGlobalContext();

  useEffect(() => {
    if (Boolean(match)) {
      navigate("/jobs");
      return;
    }
  }, []);

  // const isMobile = useMobile();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef(null);

  // console.log(isOffline)

  return (
    <Grid h="100vh" templateColumns={"auto"} bg="app-bg">
      {/* {isMobile ? (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar closeMenu={onClose} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Sidebar />
      )}
      {isMobile && (
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          icon={<MenuIcon />}
          aria-label="Open Menu"
          position={"absolute"}
          top={"10px"}
          left={"10px"}
          zIndex={"10"}
        />
      )} */}
      <Outlet />
    </Grid>
  );
};

export default RootLayout;
