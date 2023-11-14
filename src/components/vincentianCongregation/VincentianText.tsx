import { Heading, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  subtitle: string;
}
const VincentianText = ({ title, subtitle }: Props) => {
  return (
    <>
      <Heading fontSize="2xl">{title}</Heading>
      <Text mt={5} mb={10} fontSize="18px">
        {subtitle}
      </Text>
    </>
  );
};

export default VincentianText;
