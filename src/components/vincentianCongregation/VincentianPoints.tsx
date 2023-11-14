import { Heading, UnorderedList, ListItem, Box } from "@chakra-ui/react";

interface Props1 {
  title: string;
  points: string[];
}

const VincentianPoints = ({ title, points }: Props1) => {
  return (
    <Box mx={{ base: "10px", lg: "90px" }} mb={10}>
      <Heading fontSize="2xl">{title}</Heading>
      <UnorderedList mt={5}>
        {points.map((item, index) => (
          <ListItem fontSize="18px" key={index}>
            {item}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default VincentianPoints;
