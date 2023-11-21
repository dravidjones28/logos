import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  Card,
} from "@chakra-ui/react";
import NoImage from "../common/NoImage";
import NoImagePic from "../../assets/no-image-placeholder.webp";
import { useNavigate } from "react-router-dom";

interface Blog {
  blogImage: String;
  blogType: String;
  title: String;
  authorImage?: String;
  authorName: String;
  posted: String;
  slug?: string;
}

export default function blogPostWithImage({
  blogImage,
  blogType,
  title,
  authorImage,
  authorName,
  posted,
  slug,
}: Blog) {
  const truncatedTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;

  const truncatedType =
    blogType.length > 20 ? blogType.slice(0, 20) + "..." : blogType;
  const navigate = useNavigate();

  return (
    <Card cursor="pointer" overflow="hidden" maxHeight={440}>
      <Center>
        <Box
          maxW={"445px"}
          height={"405px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          onClick={() => navigate(`/blogs/${slug}`)}
          p={6}
          overflow={"hidden"}
        >
          <Box h={"200px"}>
            <Image
              src={`${blogImage ? blogImage : NoImagePic}`}
              borderRadius="10px"
              width={{ base: "100%" }}
              height={{ base: "180px" }}
              objectFit="cover"
            />
          </Box>
          <Box display="flex" alignItems="end">
            <Box>
              <Stack>
                <Text
                  color={"pink.400"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {truncatedType}
                </Text>
                <Heading
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color="rgb(52, 71, 103)"
                  fontSize="20px"
                  // fontFamily={"body"}
                >
                  {truncatedTitle}
                </Heading>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                {authorImage ? <Avatar src={`${authorImage}`} /> : <NoImage />}
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600} color="rgb(52, 71, 103);">
                    {authorName}
                  </Text>
                  <Text color={"gray.500"}>{posted}</Text>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Center>
    </Card>
  );
}
