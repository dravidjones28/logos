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
import logout from "../common/logout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { LuChurch } from "react-icons/lu";
import { FaChurch, FaPray, FaYoutube } from "react-icons/fa";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
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

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "" },
  {
    name: "Retreat Bookings",
    icon: FaChurch,
    link: "/dashboard/retreat-bookings",
  },
  {
    name: "Mass Bookings",
    icon: LuChurch,
    link: "/dashboard/mass-bookings",
  },

  {
    name: "Prayer Request",
    icon: FaPray,
    link: "/dashboard/prayer-request",
  },
  {
    name: "Youtube Link",
    icon: FaYoutube,
    link: "/dashboard/youtube-link",
  },
];

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight={{ lg: "1px" }}
      borderRightColor={{ lg: useColorModeValue("gray.200", "gray.700") }}
      w={{ base: "full", md: "235px" }}
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
          fontSize="14px"
          fontWeight={700}
        >
          LOGOS RETREAT CENTRE
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item) => (
        <NavItem
          onClick={() => navigate(`${item.link}`)}
          fontWeight={500}
          key={item.name}
          icon={item.icon}
        >
          {item.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
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

export const MobileNav = ({ onOpen }: MobileProps) => {
  const navigate = useNavigate();
  const query = useQueryClient();

  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      // width="100vw"
      height="60px"
      alignItems="center"
      bg={"#3182ce"}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        color="#fff"
      />

      <Image
        display={{ base: "block", lg: "none" }}
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

const SidebarWithHeader = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} />
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
    </Box>
  );
};

export default SidebarWithHeader;
