"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import { MouseEventHandler } from "react";
import { MainWB } from "../webworker/workerInit";
import { useNavigate } from "react-router-dom";

const Init = () => {
  const navigate = useNavigate();

  const progressRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [error, setError] = useState(false);

  const handleInstall: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setInstalling(true);
    MainWB.postMessage({ type: "init" });
  };

  useEffect(() => {
    MainWB.addEventListener(
      "message",
      ({ data: { type, progress, success } }) => {
        if (progress !== undefined && !success) {
          progressRef.current!.style.width = `${progress}%`;
        }

        if (type === "installingItems" && progress === 0) {
          statusRef.current!.textContent = "Fetching library items...";
          return;
        }

        if (type === "databaseSetup" && progress === 0) {
          statusRef.current!.textContent = "Setting up database...";
          return;
        }

        if (type === "installingJobs" && progress === 0) {
          statusRef.current!.textContent = "Setting up database...";
          return;
        }

        if (type === "jobsDbSetup" && progress === 0) {
          statusRef.current!.textContent = "Setting up initial jobs...";
          return;
        }

        if (type === "installed" && success) {
          setInstalling(false);
          setInstalled(true);
          return;
        }

        if (type === "error") {
          setInstalled(false);
          setInstalling(false);
          setError(true);
        }
      }
    );
  }, []);

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
