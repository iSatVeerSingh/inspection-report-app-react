import {
  // Drawer,
  // DrawerContent,
  // DrawerOverlay,
  Grid,
  // IconButton,
  // useDisclosure,
} from "@chakra-ui/react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useMatch,
  useNavigate,
} from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
import { useEffect } from "react";
import { UserDB } from "../services/clientdb";
import { GlobalContext } from "../services/context";
// import { MenuIcon } from "../icons";
// import useMobile from "../hooks/useMobile";
// import "../workers/workerInit";

export const rootLoader = async () => {
  try {
    const user = await UserDB.user.get("user");
    if (!user) {
      return redirect("/login");
    }
    return user;
  } catch (err) {
    return redirect("/login");
  }
};

const RootLayout = () => {
  const user = useLoaderData();

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
    <GlobalContext.Provider
      value={{
        user,
      }}
    >
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
    </GlobalContext.Provider>
  );
};

export default RootLayout;
