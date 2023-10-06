import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import React, { MouseEventHandler } from "react";

type PageLayoutProps = {
  title: string;
  titleBtn?: string;
  onBtnClick?: MouseEventHandler;
  children: React.ReactNode;
};

const PageLayout = ({
  title,
  titleBtn,
  onBtnClick,
  children,
}: PageLayoutProps) => {
  return (
    <Grid templateRows={"60px auto"} h={"100%"} overflow={"hidden"}>
      <Flex
        alignItems={"center"}
        px={4}
        bg="main-bg"
        borderBottom={"stroke"}
        justifyContent={"space-between"}
      >
        <Heading
          fontWeight={"semibold"}
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          color="rich-black"
        >
          {title}
        </Heading>
        {titleBtn && (
          <ButtonPrimary onClick={onBtnClick}>{titleBtn}</ButtonPrimary>
        )}
      </Flex>
      <Box overflowY={"scroll"} p={{ base: 2, sm: 3 }}>
        {children}
      </Box>
    </Grid>
  );
};

export default PageLayout;
