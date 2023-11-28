import { MobileNav, SidebarContent } from "../SideBar/SideBar";
import {
  Grid,
  GridItem,
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"aside nav" "aside main"`,
        }}
        templateColumns={{
          base: `"1fr"`,
          lg: "235px 1fr",
        }}
        templateRows={{
          base: `"50px 1fr"`,
          lg: "73px",
        }}
      >
        <GridItem
          area="aside"
          display={{ base: "none", lg: "block" }}
          height="100vh"
          bg="#ccc"
        >
          <SidebarContent onClose={onClose} />
        </GridItem>
        <GridItem area="nav">
          <MobileNav onOpen={onOpen} />
          <Box display={{ base: "block", lg: "none" }}>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <SidebarContent onClose={onClose} />
              </DrawerContent>
            </Drawer>
          </Box>
        </GridItem>

        <GridItem area="main">
          <Box px={5}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
