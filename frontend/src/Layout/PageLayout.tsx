import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import React, { MouseEventHandler } from "react";
import useMobile from "../hooks/useMobile";

type PageLayoutProps = {
  title: string;
  titleBtn?: string;
  onBtnClick?: MouseEventHandler;
  btnLoading?: boolean;
  children: React.ReactNode;
};

const PageLayout = ({
  title,
  titleBtn,
  onBtnClick,
  children,
  btnLoading,
}: PageLayoutProps) => {
  const isMobile = useMobile();

  return (
    <Grid templateRows={"60px auto"} h={"100%"} overflow={"hidden"}>
      <Flex
        alignItems={"center"}
        px={4}
        bg="main-bg"
        borderBottom={"stroke"}
        justifyContent={"space-between"}
        pl={isMobile ? "60px" : "auto"}
      >
        <Heading
          fontWeight={"semibold"}
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          color="rich-black"
        >
          {title}
        </Heading>
        {titleBtn && (
          <ButtonPrimary isLoading={btnLoading} onClick={onBtnClick}>
            {titleBtn}
          </ButtonPrimary>
        )}
      </Flex>
      <Box overflowY={"scroll"} p={{ base: 2, sm: 3 }}>
        {children}
      </Box>
    </Grid>
  );
};

export default PageLayout;
