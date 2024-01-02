import { Button, ButtonProps } from "@chakra-ui/react";
import React, { Ref, forwardRef } from "react";

type ButtonOutlineProps = ButtonProps & {
  children: React.ReactNode;
};

const ButtonOutline = (
  { children, ...btnProps }: ButtonOutlineProps,
  ref: Ref<HTMLButtonElement>
) => {
  return (
    <Button
      border={"2px"}
      borderColor={"primary.500"}
      backgroundColor={"primary.50"}
      color={"primary.500"}
      borderRadius={"lg"}
      size={{ base: "sm", md: "md" }}
      {...btnProps}
      ref={ref}
    >
      {children}
    </Button>
  );
};

export default forwardRef(ButtonOutline);
