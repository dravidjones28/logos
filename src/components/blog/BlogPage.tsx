import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import useBlogs from "../../hooks/blogs/useBlogs";
import LGBox from "../common/LGBox";
import BlogContainer from "../common/BlogContainer";
import Blog1 from "../../components/blog/Blog";

const BlogPage = () => {
  const { data: blogs, error, isLoading } = useBlogs();

  const firstThree = blogs?.slice(0, 3);

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
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={5}
      gap={10}
      mx={{ base: "30px", lg: "145px" }}
    >
      {firstThree?.map((item, index) => (
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
      {/* <Blog
        blogImage={post1}
        blogType="SPIRITUAL GROWTH"
        title="Unlocking The Power Of Silent Retreats"
        authorImage={author1}
        authorName="Rev. Fr. Dr. Jose Vettiyankal VC"
        posted="Posted on 28 February 2023"
        slug="655bb049de6b08001c442dca"
      /> */}
    </SimpleGrid>
  );
};

export default BlogPage;
