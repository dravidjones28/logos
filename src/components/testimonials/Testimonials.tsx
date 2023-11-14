import { Icon } from "@chakra-ui/icons";
import { SimpleGrid, Card, Flex, Box, Text, Image } from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";

const Testimonials = () => {
  let imageUrl =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695361455/Logos%20Retreat%20Centre/Maria_qhdfmp.webp";
  let name = "John Deo";
  let dateNow = "1 day ago";
  let des =
    "My visit to Logos Retreat Center brought me closer to Jesus. I felt a spiritual awakening that has changed my life.";

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, lg: 2, xl: 3 }}
        spacing={5}
        mx={{ base: "30px", lg: "145px" }}
        gap={20}
        justifyContent="center"
        mt={{ base: 20, lg: "90px" }}
      >
        <Card minWidth={{ base: "270px", lg: "300px" }} px={5}>
          <Box position="relative" top="-30px">
            <Image
              src={`${imageUrl}`}
              width="3.625rem"
              height="3.625rem"
              objectFit="cover"
              borderRadius="10px"
            />
            <Text
              fontSize="0.9375rem"
              lineHeight={1.5}
              color="rgb(52, 71, 103)"
              fontWeight={700}
              mb="4px"
            >
              {name}
            </Text>
            <Flex>
              <Icon as={BiTimeFive} mt={0.5} mr="3px" boxSize="15px" />
              <Text textAlign="center" fontSize="12px">
                {dateNow}
              </Text>
            </Flex>
            <Text
              my="30px"
              fontSize="1.0625rem"
              fontWeight={400}
              lineHeight={1.6}
              color="rgb(73, 76, 92)"
            >
              "{des}"
            </Text>
          </Box>
        </Card>
        <Card minWidth={{ base: "270px", lg: "300px" }} px={5}>
          <Box position="relative" top="-30px">
            <Image
              src={`${imageUrl}`}
              width="3.625rem"
              height="3.625rem"
              objectFit="cover"
              borderRadius="10px"
            />
            <Text
              fontSize="0.9375rem"
              lineHeight={1.5}
              color="rgb(52, 71, 103)"
              fontWeight={700}
              mb="4px"
            >
              {name}
            </Text>
            <Flex>
              <Icon as={BiTimeFive} mt={0.5} mr="3px" boxSize="15px" />
              <Text textAlign="center" fontSize="12px">
                {dateNow}
              </Text>
            </Flex>
            <Text
              my="30px"
              fontSize="1.0625rem"
              fontWeight={400}
              lineHeight={1.6}
              color="rgb(73, 76, 92)"
            >
              "{des}"
            </Text>
          </Box>
        </Card>
        <Card minWidth={{ base: "270px", lg: "300px" }} px={5}>
          <Box position="relative" top="-30px">
            <Image
              src={`${imageUrl}`}
              width="3.625rem"
              height="3.625rem"
              objectFit="cover"
              borderRadius="10px"
            />
            <Text
              fontSize="0.9375rem"
              lineHeight={1.5}
              color="rgb(52, 71, 103)"
              fontWeight={700}
              mb="4px"
            >
              {name}
            </Text>
            <Flex>
              <Icon as={BiTimeFive} mt={0.5} mr="3px" boxSize="15px" />
              <Text textAlign="center" fontSize="12px">
                {dateNow}
              </Text>
            </Flex>
            <Text
              my="30px"
              fontSize="1.0625rem"
              fontWeight={400}
              lineHeight={1.6}
              color="rgb(73, 76, 92)"
            >
              "{des}"
            </Text>
          </Box>
        </Card>
      </SimpleGrid>
    </>
  );
};

export default Testimonials;
