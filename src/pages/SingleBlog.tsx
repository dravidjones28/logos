import { useEffect, useRef } from "react";
import useBlog from "../hooks/blogs/useBlog";
import {
  Spinner,
  Box,
  Heading,
  Image,
  Card,
  Text,
  Avatar,
} from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import { useLocation, useParams } from "react-router-dom";
import NoImage from "../assets/no-image-placeholder.webp";
import Footer from "../components/footer/Footer";

const SingleBlog = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const { slug } = useParams();
  const { data: blog, error, isLoading } = useBlog(slug!);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (boxRef.current) {
      const boxHeight = boxRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      console.log(windowHeight);
      if (boxHeight > windowHeight) {
        boxRef.current.style.height = "100%";
      } else {
        boxRef.current.style.height = "100vh";
      }
    }
  }, [!isLoading]);

  if (isLoading)
    return (
      <LGBox>
        <Box
          display="flex"
          height="70vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </LGBox>
    );
  if (error || !blog) throw error;

  return (
    <Box bg="#eef0f3" ref={boxRef}>
      <LGBox>
        <Image
          width="100%"
          height="170px"
          objectFit="cover"
          src={`${blog.blogImage ? blog.blogImage : NoImage}`}
        />
        <Box mx={{ base: "10px", lg: "30px" }}>
          <Card
            mx={{ base: "10px", lg: "20px" }}
            mt="20px"
            position="relative"
            top="-80px"
          >
            <Box position="absolute" top="-34px" left="70px">
              <Avatar
                src={
                  blog.authorImage
                    ? `${blog.authorImage}`
                    : "https://bit.ly/broken-link"
                }
                size="lg"
                name={blog.authorName}
                color="#fff"
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              my={10}
              mx={{ base: "40px", lg: "130px" }}
            >
              <Box>
                <Text
                  textAlign="left"
                  textTransform="uppercase"
                  color="gray.600"
                  fontWeight={500}
                >
                  {blog.blogType}
                </Text>
                <Heading fontSize={{ base: "3xl", lg: "5xl" }} mb={10}>
                  {blog.blogTitle}
                </Heading>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: blog.description ? blog.description : "",
                  }}
                  //   p="4" // You can apply Chakra UI styling here
                  //   bg="gray.100"
                  //   border="1px solid"
                  //   borderColor="gray.200"
                  borderRadius="md"
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </LGBox>
      <Footer />
    </Box>
  );
};

export default SingleBlog;
