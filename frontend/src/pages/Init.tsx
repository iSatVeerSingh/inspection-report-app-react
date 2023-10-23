"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import inspectionApi from "../services/api";
import { Db } from "../services/clientdb";

const Init = () => {
  const navigate = useNavigate();

  const progressRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [error, setError] = useState(false);

  const handleInstall: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setInstalling(true);
    // MainWB.postMessage({ type: "init" });
  };

  const getInitData = async (type: string) => {
    try {
      const response = await inspectionApi.get(
        type === "libraryItems" ? "/all-library-items.json" : "/jobs.json",
        {
          onDownloadProgress: (e) => {
            const progress = Math.floor(e.progress! * 100);
            if (progress % 2 === 0) {
              progressRef.current!.style.width = `${progress}%`;
            }
          },
        }
      );

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const setupDatabase = async (dataArr: any[], type: string) => {
    try {
      for (let i = 0; i < dataArr.length; i++) {
        const item = dataArr[i];

        if (type === "libraryItems") {
          item.id = Date.now().toString(36);
          await Db.libraryItems.add(item);
        } else {
          item.jobNumber = 23450 + i;
          await Db.jobs.add(item);
        }
        const progress = (i / dataArr.length) * 100;
        progressRef.current!.style.width = `${progress}%`;
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const installApp = async () => {
      statusRef.current!.textContent = "Fetching library items...";
      const libraryItems = await getInitData("libraryItems");
      if (!libraryItems) {
        setError(true);
        setInstalling(false);
        return;
      }
      statusRef.current!.textContent = "Setting up database...";
      let success = await setupDatabase(libraryItems, "libraryItems");
      if (!success) {
        setError(true);
        setInstalling(false);
        return;
      }
      statusRef.current!.textContent = "Fetching inspection jobs...";
      const allJobs = await getInitData("jobs");
      if (!allJobs) {
        setError(true);
        setInstalling(false);
        return;
      }
      statusRef.current!.textContent = "Setting up initial jobs...";
      success = await setupDatabase(allJobs, "jobs");
      if (!success) {
        setError(true);
        setInstalling(false);
        return;
      }

      setInstalled(true);
      setInstalling(false);
    };

    if (installing) {
      installApp();
    }
  }, [installing]);

  const handleGoto = () => {
    navigate("/jobs");
  };

  return (
    <Center bg="app-bg" h="100vh" px={4}>
      <Box
        bg="main-bg"
        px={3}
        py={5}
        border="stroke"
        borderRadius="base"
        w="100%"
        maxW="2xl"
        textAlign={"center"}
      >
        {!installing && !installed && !error && (
          <Box textAlign="center">
            <Heading color="rich-black">Important!</Heading>
            <Text color="main-text">
              This application is under developement. Only a few features have
              been implemented yet. If you find any bugs or performance issues,
              please report to the developer immediately
            </Text>
            <Box mt={5}>
              <ButtonPrimary onClick={handleInstall}>
                Install Application
              </ButtonPrimary>
            </Box>
          </Box>
        )}
        {installing && !installed && (
          <Box>
            <Text fontSize={"xl"} ref={statusRef}>
              Installing App...
            </Text>
            <Box
              width={"300px"}
              h={4}
              bg={"blue.400"}
              borderRadius={"full"}
              overflow={"hidden"}
              mx={"auto"}
            >
              <Box
                ref={progressRef}
                w={0}
                transitionProperty={"all"}
                transitionDuration={"30ms"}
                h={"full"}
                bg={"blue.700"}
              ></Box>
            </Box>
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
        )}
      </Box>
    </Center>
  );
};

export default Init;
