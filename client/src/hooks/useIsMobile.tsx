import { useBreakpointValue } from "@chakra-ui/react";

export default () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  return isMobile;
};
