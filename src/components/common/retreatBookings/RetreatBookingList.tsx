import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  Text,
} from "@chakra-ui/react";

interface RetreatBookingDetails {
  title: String;
  buttonTitle: String;
  list: string[];
}

const RetreatBookingList = ({
  title,
  buttonTitle,
  list,
}: RetreatBookingDetails) => {
  return (
    <Box>
      <Text
        whiteSpace="nowrap"
        fontSize="15px"
        fontWeight={500}
        color="gray.600"
      >
        {title}
      </Text>
      <Menu>
        <MenuButton
          bg="#f3f3f3"
          as={Button}
          fontSize="13px"
          rightIcon={<ChevronDownIcon />}
          _hover={{ backgroundColor: "#f3f3f3" }}
          pl="0px"
          color="gray.600"
          mt="5px"
        >
          {buttonTitle}
        </MenuButton>
        <MenuList>
          {list.map((item, index) => (
            <MenuItem key={index} fontSize="13px">
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default RetreatBookingList;
