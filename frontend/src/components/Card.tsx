"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <Box p={2} border="stroke" borderRadius={"md"} bg="main-bg">
      {children}
    </Box>
  )
}

export default Card;