import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import Logo from "../../assets/logo-dark.svg";
import LogoLight from "../../assets/logo-light.svg";
import db from "../common/db";
import NoImage from "../common/NoImage";
import { ReactNode } from "react";
import logout from "../common/logout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PiHandsPrayingLight } from "react-icons/pi";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SideBar {
  children: ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome },
  { name: "Prayer Request", icon: PiHandsPrayingLight },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        cursor="pointer"
      >
        <Image onClick={() => navigate("/")} src={Logo} width={34} />
        <Text
          onClick={() => navigate("/")}
          ml={{ lg: "15px" }}
          fontSize="17px"
          fontWeight={700}
        >
          Logos Retreat Center
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem fontWeight={500} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
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
          color: "#ccc",
        }}
        {...rest}
      >
        <Box
          display="flex"
          width="34px"
          height="34px"
          bg="#3182ce"
          borderRadius="10px"
          alignItems="center"
          justifyContent="center"
          mr={5}
        >
          <Icon
            fontSize="16"
            color="#fff"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        </Box>

        {children}
      </Flex>
    </Box>
  );
};

const sessionStorage = db();

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const query = useQueryClient();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"#3182ce"}
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
        color="#fff"
      />

      <Image
        display={{ base: "block", md: "none" }}
        src={LogoLight}
        width={34}
        onClick={() => navigate("/")}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {sessionStorage?.profilePic ? (
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                ) : (
                  <NoImage />
                )}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="#fff" fontWeight={700}>
                    {sessionStorage?.name}
                  </Text>
                  <Text fontSize="xs" color="#fff" fontWeight={700}>
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => {
                  logout();
                  query.clear();

                  navigate("/login");
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: SideBar) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
