import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Link as ChakraLink,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, Link as ReactRouterLink, useLocation } from "react-router-dom";
import menuItems from "../router/menuItems";
import { useGlobalContext } from "../context/globalContext";
import { ChevronDown } from "../icons";

const Sidebar = () => {
  const location = useLocation();
  const currentSectionPath = location.pathname.split("/")[1];

  const { user } = useGlobalContext();
  const menuLinks =
    user.role === "Owner"
      ? menuItems
      : user.role === "Admin"
      ? menuItems.filter(
          (menu) => menu.access === "Any" || menu.access === "Admin"
        )
      : menuItems.filter((menu) => menu.access === "Any");

  return (
    <Box bg="card-bg" px={3} py={3} shadow="xs">
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"sm"} src="/logo.png" />
        <Text color="text-big" fontSize="xl">
          {user.name}
        </Text>
      </Flex>
      <VStack justify={"stretch"} mt={4}>
        {menuLinks.map((item, index) => (
          <Flex
            key={index}
            alignItems={"center"}
            fontSize={"xl"}
            borderRadius={"lg"}
            bg={
              item.path === "/" + currentSectionPath
                ? "nav-bg"
                : "card-bg-secondary"
            }
            color={
              item.path === "/" + currentSectionPath ? "white" : "text-big"
            }
            w="full"
          >
            <ChakraLink
              flexGrow={1}
              px={2}
              py={2}
              to={item.path}
              gap={2}
              as={ReactRouterLink}
              display={"flex"}
              alignItems={"center"}
              _hover={{
                textDecoration: "none",
              }}
            >
              <item.icon boxSize={7} />
              <Text as="span">{item.name}</Text>
            </ChakraLink>
            {item.subItems && user.role !== "Inspector" && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDown />}
                  backgroundColor={"transparent"}
                  color={
                    item.path === "/" + currentSectionPath
                      ? "white"
                      : "text-big"
                  }
                  _active={{
                    backgroundColor: "transparent",
                  }}
                  _hover={{
                    color: "black",
                  }}
                />
                <MenuList color={"text-big"} boxShadow={"2xl"}>
                  {item.subItems.items.map((subItem) => (
                    <MenuItem>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
