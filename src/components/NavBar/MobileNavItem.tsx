import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Stack,
  Icon,
  Collapse,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
import NavItem from "./utlies/navItem";
import { Link } from "react-router-dom";

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={1} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color="#fff">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            color="#fff"
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          pl={2}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
          mb={2}
        >
          {children &&
            children.map((child) => (
              <Box py={1} key={child.label} color="#fff">
                <Link to={`${child.href}`}>{child.label}</Link>
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavItem;
