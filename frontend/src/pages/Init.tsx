"use client";

import { useRef, useState } from "react";
import { Box, Center, Heading, Progress, Text } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import { MouseEventHandler } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { inspectionApi } from "../services/api";
import clientApi from "../services/clientApi";

export const initLoader = async () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return redirect("/login");
  }

  // const response = await clientApi.get("/init-status");
  // if (response.status !== 200) {
  //   return redirect("/login");
  // }

  // if (response.data.message === "Done") {
  //   return redirect("/jobs");
  // }
  return null;
};

const Init = () => {
  const navigate = useNavigate();
  const statusRef = useRef<HTMLDivElement | null>(null);

  const [progressBar, setProgressBar] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSetupApplication: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // setInstalling(true);

    const storage = navigator.storage;
    if (storage) {
      await storage.persist();
    }

    const user = localStorage.getItem("user");
    if (user) {
      const userResponse = await clientApi.post("/init-user", user);
      if (userResponse.status !== 200) {
        navigate("/login");
        return;
      }
    } else {
      navigate("/login");
    }

    navigate("/")
    return

    // statusRef.current!.textContent = "Fetching Library items...";
    // const libraryItemResponse = await inspectionApi.get("/install-items", {
    //   onDownloadProgress: (e) => {
    //     const progress = Math.floor(e.progress! * 100);
    //     setProgressBar(progress);
    //   },
    // });

    // if (libraryItemResponse.status !== 200) {
    //   setError(libraryItemResponse.data.message);
    //   setInstalling(false);
    //   return;
    // }

    // statusRef.current!.textContent = "Setting up database for library items...";

    // const initLibraryResponse = await clientApi.post(
    //   "/init-library-items",
    //   libraryItemResponse.data
    // );
    // if (initLibraryResponse.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // const libItemCategoryResponse = await inspectionApi.get(
    //   "/install-item-categories",
    //   {
    //     onDownloadProgress: (e) => {
    //       const progress = Math.floor(e.progress! * 100);
    //       setProgressBar(progress);
    //     },
    //   }
    // );
    // if (libItemCategoryResponse.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // const initLibCategory = await clientApi.post(
    //   "/init-library-item-categories",
    //   libItemCategoryResponse.data
    // );
    // if (initLibCategory.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // statusRef.current!.textContent =
    //   "Setting up database for inspection notes...";

    // const libInspectionNotesResponse = await inspectionApi.get(
    //   "/install-inspection-notes",
    //   {
    //     onDownloadProgress: (e) => {
    //       const progress = Math.floor(e.progress! * 100);
    //       setProgressBar(progress);
    //     },
    //   }
    // );
    // if (libInspectionNotesResponse.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }

    // const initInspectionnotes = await clientApi.post(
    //   "/init-inspection-notes",
    //   libInspectionNotesResponse.data
    // );
    // if (initInspectionnotes.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // statusRef.current!.textContent = "Setting up database for jobs...";
    // const jobsResponse = await inspectionApi.get("/install-jobs");
    // if (jobsResponse.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // const initjobs = await clientApi.post("/init-jobs", jobsResponse.data);
    // if (initjobs.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // const jobCategoriesResponse = await inspectionApi.get(
    //   "/install-job-categories"
    // );
    // if (jobCategoriesResponse.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }
    // const initJobCategories = await clientApi.post(
    //   "/init-job-categories",
    //   jobCategoriesResponse.data
    // );
    // if (initJobCategories.status !== 200) {
    //   setError("Something went wrong");
    //   setInstalling(false);
    //   return;
    // }

    // setInstalled(true);
    // setInstalling(false);
  };

  // const handleGoto = () => {
  //   navigate("/jobs");
  // };

  return (
    <Center bg="app-bg" h="100vh" px={4}>
      <Box
        bg="card-bg"
        px={5}
        py={5}
        borderRadius="xl"
        shadow={"xs"}
        w="100%"
        maxW="2xl"
      >
        <ButtonPrimary w="full" onClick={handleSetupApplication}>Setup Application</ButtonPrimary>
        {/* {!installing && !installed && !error && (
          <Box textAlign="center">
            <Heading color="rich-black">Important!</Heading>
            <Text color="main-text">
              This application is under developement. Only a few features have
              been implemented yet. If you find any bugs or performance issues,
              please report to the developer immediately
            </Text>
            <Box mt={5}>
              <ButtonPrimary onClick={handleInstall}>
                Seup Application
              </ButtonPrimary>
            </Box>
          </Box>
        )}
        {installing && !installed && (
          <Box>
            <Text fontSize={"xl"} ref={statusRef}>
              Installing App...
            </Text>
            <Progress hasStripe value={progressBar} />
          </Box>
        )}
        {installed && !installing && (
          <Box>
            <Text>Installed Successfully</Text>
            <ButtonPrimary onClick={handleGoto}>Go To App</ButtonPrimary>
          </Box>
        )}
        {error && (
          <Box>
            <Text color={"red"}>Something Went Wront</Text>
          </Box>
        )} */}
      </Box>
    </Center>
  );
};

export default Init;
