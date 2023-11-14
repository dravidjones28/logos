import { Center, Box, Text } from "@chakra-ui/react";

interface Props1 {
  title: string;
  subTitle: string;
}

const IntercessionComponent = ({ title, subTitle }: Props1) => {
  return (
    <Box maxWidth={300}>
      <Center>
        <span
          style={{
            fontSize: "50px",
            fontWeight: 500,
            color: "#358eed",
          }}
        >
          24/7
        </span>
      </Center>
      <Text fontWeight={500} fontSize="20px" textAlign="center">
        {title}
      </Text>
      <Text textAlign="center" mt={2}>
        {subTitle}
      </Text>
    </Box>
  );
};

export default IntercessionComponent;
