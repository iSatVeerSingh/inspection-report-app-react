import { Box, BoxProps } from "@chakra-ui/react";

type CardProps = BoxProps;

const Card = ({ children, ...props }: CardProps) => {
  return (
    <Box bg={"main-bg"} p={3} borderRadius={"xl"} shadow={"xs"} {...props}>
      {children}
    </Box>
  );
};

export default Card;
