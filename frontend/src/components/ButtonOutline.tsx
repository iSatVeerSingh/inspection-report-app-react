import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonOutlineProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonOutline = ({ children, ...btnProps }: ButtonOutlineProps) => {
  return (
    <Button
      {...btnProps}
      border="2px"
      colorScheme="messenger"
      variant="outline"
      size={{ base: "sm", md: "md" }}
    >
      {children}
    </Button>
  );
};

export default ButtonOutline;
