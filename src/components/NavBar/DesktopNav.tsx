import {
  useColorModeValue,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
} from "@chakra-ui/react";
import pages from "./pages";
import DesktopSubNav from "./DesktopSubNav";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  const linkColor = "#fff";
  const linkHoverColor = "#ccc";
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {pages.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                // href={navItem.href ?? "#"}
                cursor="pointer"
                fontSize="14px"
                fontWeight={500}
                whiteSpace="nowrap"
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child, index) => (
                    <div key={index}>
                      <Link to={`${child.href}`}>
                        <DesktopSubNav key={child.label} {...child} />
                      </Link>
                    </div>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
