import { Text, Box } from "@chakra-ui/react";

interface Mass {
  title: string;
  subTitle: string;
  mt?: number;
}
const MassText = ({ title, subTitle, mt }: Mass) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        px={10}
      >
        <Text mt={mt} textAlign="left" color="#fff" fontWeight={500}>
          {title}
        </Text>
        <Text textAlign="left" color="#fff">
          {subTitle}
        </Text>
      </Box>
    </>
  );
};

export default MassText;
