import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonPrimaryProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonPrimary = ({ children, ...btnProps }: ButtonPrimaryProps) => {
  return (
    <Button
      bg={"primary.500"}
      borderRadius={"lg"}
      color={"white"}
      _hover={{
        background: "primary.600",
      }}
      {...btnProps}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
