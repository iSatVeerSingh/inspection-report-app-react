import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonOutlineProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonOutline = ({ children, ...btnProps }: ButtonOutlineProps) => {
  return (
    <Button
      border={"2px"}
      borderColor={"primary.500"}
      backgroundColor={"primary.50"}
      color={"primary.500"}
      borderRadius={"lg"}
      size={{ base: "sm", md: "md" }}
      {...btnProps}
    >
      {children}
    </Button>
  );
};

export default ButtonOutline;
