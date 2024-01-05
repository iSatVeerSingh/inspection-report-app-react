import { Button, ButtonProps } from "@chakra-ui/react";

const ButtonOutline = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      px={3}
      borderRadius={"full"}
      color={"primary.500"}
      bg={"primary.50"}
      border="2px"
      borderColor={"primary.500"}
    >
      {children}
    </Button>
  );
};

export default ButtonOutline;
