import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

type ButtonPrimaryProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonPrimary = ({ children, ...btnProps }: ButtonPrimaryProps) => {
  return <Button colorScheme="messenger" borderRadius={"lg"} {...btnProps}>{children}</Button>;
};

export default ButtonPrimary;
