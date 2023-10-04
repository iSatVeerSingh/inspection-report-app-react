import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonPrimaryProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonPrimary = ({ children, ...btnProps }: ButtonPrimaryProps) => {
  return (
    <Button {...btnProps} bg="blue-primary" color="white" colorScheme="messenger">
      {children}
    </Button>
  );
};

export default ButtonPrimary;
