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
        h={12}
        borderBottom={"stroke"}
        px={4}
        py={3}
      >
        <Avatar size="sm" src="/vite.svg" border="stroke" />
        <Heading as="h2" fontSize="2xl" fontWeight="medium">
          Michelle
        </Heading>
      </Flex>
      <VStack px={4} py={3}>
        {menuItems.map((item) => (
          <ChakraLink
            as={ReactRouterLink}
            to={item.path}
            bg="nav-bg"
            w={"full"}
            textDecoration={"none"}
            _hover={{
              textDecoration: "none",
            }}
            borderRadius={"sm"}
            color={"nav-link"}
          >
            <Flex px={3} py={2} fontSize={"xl"}>
              {item.name}
            </Flex>
          </ChakraLink>
        ))}
      </VStack>
    </>
  );
};

export default Sidebar;
