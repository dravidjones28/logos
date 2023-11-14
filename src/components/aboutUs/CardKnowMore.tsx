import {
  Center,
  Stack,
  Heading,
  Box,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  bgImage: string;
  title: string;
  subtitle: string;
  href?: string;
  buttonName: string;
  link?: string;
}
const CardKnowMore = ({
  bgImage,
  title,
  subtitle,
  href,
  buttonName,
  link,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Center>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          // bg={"gray.100"}
          // mt={-10}
          // mx={-6}
          mb={6}
        >
          <Image
            //   overflow={"hidden"}
            src={bgImage}
            borderRadius="10px"
            width={{ base: "100%" }}
            height={{ base: "250px" }}
            objectFit="cover"
          />
        </Box>
        <Stack mt={20}>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color="rgb(52, 71, 103)"
            fontSize={"2xl"}
            // fontFamily={"body"}
          >
            {title}
          </Heading>
          {/* <Text color={"gray.500"}>{des}</Text> */}
        </Stack>
        <Text mt={2} fontSize="20px">
          {subtitle}
        </Text>
        <Button
          size={{ base: "md" }}
          onClick={() => {
            if (href) return navigate(`${href}`);
            else {
              return window.open(link, "_blank");
            }
          }}
          my={5}
          colorScheme="blue"
          fontWeight={400}
          mb={20}
          textTransform="uppercase"
        >
          {buttonName}
        </Button>
      </Box>
    </Center>
  );
};

export default CardKnowMore;
