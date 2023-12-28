import { Box, Flex, Grid, Heading, IconButton } from "@chakra-ui/react";
import ButtonPrimary from "../components/ButtonPrimary";
import React, { MouseEventHandler } from "react";
// import useMobile from "../hooks/useMobile";
import { ChevronLeft } from "../icons";
import { useNavigate } from "react-router-dom";

type PageLayoutProps = {
  title: string;
  titleBtn?: string;
  onBtnClick?: MouseEventHandler;
  btnLoading?: boolean;
  children: React.ReactNode;
  isRoot?: boolean;
};

// ipad mini 1024 x 768
// ipad air  1180 x 820
// ipad pro 1366 x 1024

const PageLayout = ({
  title,
  titleBtn,
  onBtnClick,
  children,
  btnLoading,
  isRoot,
}: PageLayoutProps) => {
  // const isMobile = useMobile();
  const navigate = useNavigate();

  return (
    <Grid templateRows={"60px auto"} h={"100%"} overflow={"hidden"}>
      <Flex
        alignItems={"center"}
        px={3}
        bg="card-bg"
        shadow={"xs"}
        justifyContent={"space-between"}
        // // pl={isMobile ? "60px" : "auto"}
      >
        <Heading
          fontWeight={"semibold"}
          fontSize={"2xl"}
          // fontSize={{ base: "xl", sm: "2xl" }}
          color="text-big"
          flexGrow={1}
        >
          {!isRoot && (
            <IconButton
              aria-label="Back"
              icon={<ChevronLeft />}
              onClick={() => navigate(-1)}
              mr={2}
            />
          )}
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
