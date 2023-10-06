import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonPrimaryProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonPrimary = ({ children, ...btnProps }: ButtonPrimaryProps) => {
  return (
    <Button
      bg="blue-primary"
      color="white"
      colorScheme="messenger"
      size={{ base: "sm", md: "md" }}
      {...btnProps}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
