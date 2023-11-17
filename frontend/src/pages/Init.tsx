"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Center, Heading, Progress, Text } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import { MouseEventHandler } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Db } from "../services/clientdb";
import Dexie from "dexie";
import { inspectionApi } from "../services/api";
import { LibraryItem } from "../types";
import axios from "axios";

export const initLoader = async () => {
  try {
    const isExists = await Dexie.exists("inspection-db");
    if (isExists) {
      const count = await Db.libraryItems.count();
      if (count !== 0) {
        return redirect("/jobs");
      }
      return null;
    }
    return null;
  } catch (err) {
    return redirect("/login");
  }
};

const Init = () => {
  const navigate = useNavigate();
  const statusRef = useRef<HTMLDivElement | null>(null);

  const [progressBar, setProgressBar] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [error, setError] = useState(false);

  const handleInstall: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setInstalling(true);
  };

  useEffect(() => {
    const installApp = async () => {
      statusRef.current!.textContent = "Fetching library items...";
      try {
        const response = await inspectionApi.get(
          "/library-items?install=true",
          {
            onDownloadProgress: (e) => {
              const progress = Math.floor(e.progress! * 100);
              setProgressBar(progress);
            },
          }
        );

        if (response.status !== 200) {
          setError(true);
          setInstalling(false);
          return;
        }

        const allItems = response.data as LibraryItem[];

        statusRef.current!.textContent = "Setting up local database...";
        for (let i = 0; i < allItems.length; i++) {
          const item = allItems[i];

          await Db.libraryItems.add(item);

          await Db.libraryIndex.add({
            id: item.id,
            category: item.category,
            name: item.name,
          });

          const progress = Math.floor((i / allItems.length) * 100);
          setProgressBar(progress);
        }

        const templateResponse = await axios.get("/report-template.json");
        if (templateResponse.status === 200) {
          await Db.template.add({
            ...templateResponse.data,
            id: "defaultTemplate",
          });
        }

        setInstalled(true);
        setInstalling(false);
      } catch (err) {
        setError(true);
        setInstalling(false);
      }
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
        )}
      </Box>
    </Center>
  );
};

export default Init;
