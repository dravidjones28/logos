import { Box, Text } from "@chakra-ui/react";

interface Detail {
  title: String;
  subText: String;
}
const Details = ({ title, subText }: Detail) => {
  return (
    <Box>
      <Text
        color="rgb(52, 71, 103)"
        letterSpacing="-0,125px"
        margin="16px 0px 12px"
        fontWeight={700}
        lineHeight={1}
        fontSize="1.375rem"
      >
        {title}
      </Text>
      <Text
        fontSize="1.065rem"
        lineHeight={1.6}
        color="rgb(73, 76, 92)"
        paddingRight="48px"
        letterSpacing="-0.125px"
      >
        {subText}
      </Text>
    </Box>
  );
};

export default Details;
