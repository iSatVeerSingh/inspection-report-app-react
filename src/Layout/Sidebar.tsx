import { Avatar, Flex, Grid, Heading, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink, useMatch } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import menuItems from "../routes/menuItems";

const Sidebar = () => {
  return (
    <Grid templateRows={"60px auto"} bg="main-bg" borderRight={"stroke"}>
      <Flex alignItems="center" gap={2} borderBottom={"stroke"} px={4} py={3}>
        <Avatar size="sm" src="/vite.svg" border="stroke" />
        <Heading as="h2" fontSize="2xl" fontWeight="medium">
          Michelle
        </Heading>
      </Flex>
      <VStack px={2} py={3}>
        {menuItems.map(({ path, name, icon: Icon }) => (
          <ChakraLink
            key={path}
            as={ReactRouterLink}
            to={path}
            bg={Boolean(useMatch(path)) ? "nav-bg" : "white"}
            w={"full"}
            textDecoration={"none"}
            _hover={{
              textDecoration: "none",
            }}
            borderRadius={"sm"}
            color={"nav-link"}
          >
            <Flex px={2} py={2} fontSize={"xl"} alignItems={"center"} gap={2}>
              <Icon boxSize={7} />
              {name}
            </Flex>
          </ChakraLink>
        ))}
      </VStack>
    </Grid>
  );
};

export default Sidebar;
