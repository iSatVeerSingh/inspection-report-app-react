"use client";

import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box w="full" h={"full"} display={"grid"} placeItems={"center"}>
      <Spinner
        size={"xl"}
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.400"
        color="blue-primary"
      />
    </Box>
  );
};

export default Loading;
