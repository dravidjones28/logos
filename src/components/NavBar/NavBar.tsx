import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  useMediaQuery,
  useDisclosure,
  useColorMode,
  Flex,
  IconButton,
  useBreakpointValue,
  Stack,
  Button,
  Collapse,
  Box,
  Text,
  Image,
  MenuList,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuOptionGroup,
} from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../../assets/logo-light.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NoImage from "../common/NoImage";

import db from "../common/db";
import logout from "../common/logout";
import { useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const session = db();
  const queryClient = useQueryClient();

  return (
    <>
      <Box position="fixed" zIndex={1} width="100vw">
        <Flex
          bg="#223547"
          color={colorMode === "light" ? "gray.600" : "white"}
          minH={"70px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              color="#fff"
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", lg: "start" }}
            ml={{ lg: 20 }}
          >
            <Link to="/">
              <Flex>
                <Image src={Logo} width={34} />
                <Text
                  fontSize={useBreakpointValue({
                    base: "lg",
                    md: "xs",
                    xl: "lg",
                  })}
                  mt={{ base: "0px", md: "5px" }}
                  letterSpacing={1}
                  fontWeight={700}
                  textAlign={useBreakpointValue({ base: "center", md: "left" })}
                  textTransform="uppercase"
                  fontFamily={"heading"}
                  color="#fff"
                  alignSelf="center"
                  marginLeft="10px"
                  whiteSpace="nowrap"
                  cursor="pointer"
                >
                  {!isMobile ? "LOGOS RETREAT centre" : ""}
                </Text>
              </Flex>
            </Link>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={10}
          >
            <Flex
              display={{ base: "none", md: "flex" }}
              ml={10}
              alignItems="center"
            >
              <DesktopNav />
            </Flex>

            {session?.accesstoken ? (
              <Menu>
                <MenuButton
                  mr={5}
                  as={IconButton}
                  icon={<NoImage />}
                  aria-label="Options"
                  variant="none"
                />

                <MenuList>
                  <MenuOptionGroup title="Profile">
                    {session.isAdmin && (
                      <MenuItem
                        isDisabled={true}
                        onClick={() => navigate("/dashboard")}
                      >
                        My Dashboard
                      </MenuItem>
                    )}
                  </MenuOptionGroup>
                  {session.isAdmin && <MenuDivider />}
                  <MenuItem
                    onClick={() => {
                      queryClient.clear();
                      logout();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                fontSize="13px"
                fontWeight={500}
                marginLeft="20px"
                // marginRight="10px"
                mr={5}
                height="20px"
                borderRadius="7px"
                bg="#348ded"
                padding="15px"
                color="#fff"
                cursor="pointer"
                _hover={{ bg: "#70b7ff" }}
                onClick={() => navigate("login")}
              >
                Login
              </Button>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      <Outlet />
    </>
  );
};

export default NavBar;
