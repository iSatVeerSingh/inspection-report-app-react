import { Box, Flex, Heading } from "@chakra-ui/react";
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
    <>
      <Flex
        h={14}
        alignItems={"center"}
        px={4}
        bg="main-bg"
        borderBottom={"stroke"}
        justifyContent={"space-between"}
      >
        <Heading fontWeight={"semibold"} color="rich-black">
          {title}
        </Heading>
        {titleBtn && (
          <ButtonPrimary onClick={onBtnClick}>{titleBtn}</ButtonPrimary>
        )}
      </Flex>
      <Box>{children}</Box>
    </>
  );
};

export default PageLayout;
