import { Avatar, Flex, Heading, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import menuItems from "../routes/menuItems";

const Sidebar = () => {
  return (
    <>
      <Flex
        alignItems="center"
        gap={2}
        h={14}
        borderBottom={"stroke"}
        px={4}
        py={3}
      >
        <Avatar size="sm" src="/vite.svg" border="stroke" />
        <Heading as="h2" fontSize="2xl" fontWeight="medium">
          Michelle
        </Heading>
      </Flex>
      <VStack px={2} py={3}>
        {menuItems.map(({ path, name, icon: Icon }) => (
          <ChakraLink
            as={ReactRouterLink}
            to={path}
            bg="nav-bg"
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
    </>
  );
};

export default Sidebar;
