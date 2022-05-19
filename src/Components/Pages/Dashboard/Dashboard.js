// CPSC 458-01
// Jeevan Acharya
// ID: 2313321

import React, { useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Link as ChakraLink,
  Divider,
  Button,
} from "@chakra-ui/react";
import { FiHome, FiSettings, FiMenu, FiToggleRight } from "react-icons/fi";
import { AiOutlineBulb } from "react-icons/ai";
import { GiPlug } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

const LinkItems = [
  { name: "Smart Devices", icon: FiHome, to: "home" },
  { name: "Smart Lights", icon: AiOutlineBulb, to: "smart_lights" },
  { name: "Smart Switches", icon: FiToggleRight, to: "smart_switches" },
  { name: "Smart Plugs", icon: GiPlug, to: "smart_plugs" },
  { name: "Settings", icon: FiSettings, to: "settings" },
];

export default function SidebarWithHeader({ children }) {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      sessionStorage.getItem("userName") === undefined ||
      sessionStorage.getItem("userName") === null
    ) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {location.pathname === "/dashboard" && (
          <h1>Please select a desired screen</h1>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const logoutClicked = () => {
    console.log("Logout clicked");
    sessionStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#4472c4")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          color="white"
          fontWeight="bold"
        >
          Welcome {sessionStorage.getItem("userName").toString().split("@")[0]}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} to={link.to}>
          <NavItem key={link.name} to="home" color="white" icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
      <Divider />
      <Flex h="90%" justifyContent="flex-end" alignItems="center" mx="3">
        <Button w={"full"} onClick={logoutClicked}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <ChakraLink
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.800",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#4472c4")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
