import { Card, Flex, Image, Box, Text } from "@chakra-ui/react";

interface Props3 {
  image: string;
  title: string;
  subtitle: string;
  desc: string;
}

const TeamComponent = ({ image, title, subtitle, desc }: Props3) => {
  return (
    <Card px={6} py={4} my={5}>
      <Flex justifyContent="space-between" gap={7}>
        <Image
          position="relative"
          top="-50px"
          borderRadius={10}
          width="150px"
          height="150px"
          src={`${image}`}
        />
        <Box mt={1}>
          <Text fontWeight={700} fontSize="20px">
            {title}
          </Text>
          <Text color="blue" fontWeight={500} fontSize="18px">
            {subtitle}
          </Text>
          <Text fontWeight={400} fontSize="17px">
            {desc}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default TeamComponent;
