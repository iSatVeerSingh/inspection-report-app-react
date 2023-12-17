import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import menuItems from "../router/menuItems";

const Sidebar = () => {
  const location = useLocation();
  const currentSectionPath = location.pathname.split("/")[1];

  return (
    <Box bg="card-bg" px={3} py={3} shadow="xs">
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"sm"} />
        <Text color="text-big" fontSize="xl">
          Correct Inspections
        </Text>
      </Flex>
      <VStack justify={"stretch"} mt={4}>
        {menuItems.map((item, index) => (
          <ChakraLink
          to={item.path}
            key={index}
            fontSize={"xl"}
            px={2}
            py={2}
            borderRadius={"xl"}
            as={ReactRouterLink}
            gap={2}
            display={"flex"}
            alignItems={"center"}
            bg={item.path === "/" + currentSectionPath ? "nav-bg" : "card-bg-secondary"}
            color={item.path === "/" + currentSectionPath ? "white" : "text-big"}
            w="full"
            _hover={{
              textDecoration: "none",
            }}
          >
            <item.icon boxSize={7} />
            <Text as="span">{item.name}</Text>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
