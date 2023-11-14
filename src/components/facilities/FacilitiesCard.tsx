import {
  Card,
  Center,
  Stack,
  Heading,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";

interface Facilities {
  img: string;
  title: string;
  des: string;
}
const FacilitiesCard = ({ img, title, des }: Facilities) => {
  return (
    <Card cursor="pointer" overflow="hidden" maxHeight={430}>
      <Center>
        <Box maxW={"445px"} w={"full"} rounded={"md"} p={6} overflow={"hidden"}>
          <Box h={"210px"}>
            <Image
              src={`${img}`}
              borderRadius="10px"
              width={{ base: "100%" }}
              height={{ base: "180px" }}
              objectFit="cover"
            />
          </Box>
          <Stack>
            <Heading color="rgb(52, 71, 103)" fontSize={"2xl"}>
              {title}
            </Heading>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Text color={"gray.500"}>{des}</Text>
          </Stack>
        </Box>
      </Center>
    </Card>
  );
};

export default FacilitiesCard;
