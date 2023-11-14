import { Card, Box, Text } from "@chakra-ui/react";

interface FormCard {
  title1: string;
  title2: string;
  width: number;
}
const FormCard = ({ title1, title2, width }: FormCard) => {
  return (
    <Box display="flex" justifyContent="center">
      <Card width={width} bg="#419bef" p={5} position="relative" top="-20px">
        <Text fontWeight={700} fontSize="25px" color="#fff" textAlign="center">
          {title1}
        </Text>
        <Text fontWeight={500} color="#fff" textAlign="center">
          {title2}
        </Text>
      </Card>
    </Box>
  );
};

export default FormCard;
