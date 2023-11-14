import LGBox from "../components/common/LGBox";
import { Flex, SimpleGrid, Text, Button, Box, Spinner } from "@chakra-ui/react";
import Blog1 from "../components/blog/Blog";
import { useLocation, useNavigate } from "react-router-dom";
import useBlogs from "../hooks/blogs/useBlogs";
import db from "../components/common/db";
import BlogContainer from "../components/common/BlogContainer";
import { useEffect } from "react";

const Blog = () => {
  const navigate = useNavigate();
  const { data: blogs, error, isLoading } = useBlogs();
  const session = db();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
  if (error) return <div>Error</div>;

  return (
    <LGBox>
      <Flex
        my={5}
        flex={1}
        justifyContent="space-between"
        mx={{ base: "30px", lg: "145px" }}
      >
        <Text
          color="rgb(52, 71, 103)"
          fontWeight={700}
          fontSize="30px"
          letterSpacing={1.1}
        >
          Blogs
        </Text>
        {session?.isAdmin && (
          <Button
            fontSize="15px"
            fontWeight={500}
            marginLeft="20px"
            marginRight="10px"
            height="20px"
            borderRadius="7px"
            bg="#348ded"
            padding="20px"
            color="#fff"
            cursor="pointer"
            _hover={{ bg: "#70b7ff" }}
            onClick={() => {
              // onOpen();
              navigate("/blogs/createBlog");
            }}
          >
            Create Blog
          </Button>
        )}
      </Flex>
      {blogs?.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Text fontWeight={500}>Sorry, no Blogs</Text>
        </Box>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={5}
        gap={10}
        mx={{ base: "30px", lg: "145px" }}
      >
        {blogs?.map((item, index) => (
          <BlogContainer key={index}>
            <Blog1
              slug={item._id}
              blogImage={item.blogImage ? item.blogImage : ""}
              blogType={item.blogType ? item.blogType : ""}
              title={item.blogTitle ? item.blogTitle : ""}
              //   des="Explore the transformative effects of silent retreats on your spiritual journey, and how they deepen your connection to God."
              authorImage={item.authorImage ? item.authorImage : ""}
              authorName={item.authorName ? item.authorName : ""}
              posted={item.uploadedDate ? item.uploadedDate : " "}
            />
          </BlogContainer>
        ))}
      </SimpleGrid>
      <Box mb={10}></Box>
    </LGBox>
  );
};

export default Blog;
