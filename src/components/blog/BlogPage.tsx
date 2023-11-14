import { SimpleGrid } from "@chakra-ui/react";
import Blog from "./Blog";

const BlogPage = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={5}
      gap={10}
      mx={{ base: "30px", lg: "145px" }}
    >
      <Blog
        blogImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/silent-retreat_hkxv00.webp"
        blogType="SPIRITUAL GROWTH"
        title="Unlocking The Power Of Silent Retreats"
        authorImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp"
        authorName="Rev. Fr. Dr. Jose Vettiyankal VC"
        posted="Posted on 28 February 2023"
      />
      <Blog
        blogImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/silent-retreat_hkxv00.webp"
        blogType="SPIRITUAL GROWTH"
        title="Unlocking The Power Of Silent Retreats"
        authorImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp"
        authorName="Rev. Fr. Dr. Jose Vettiyankal VC"
        posted="Posted on 28 February 2023"
      />
      <Blog
        blogImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/silent-retreat_hkxv00.webp"
        blogType="SPIRITUAL GROWTH"
        title="Unlocking The Power Of Silent Retreats"
        authorImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp"
        authorName="Rev. Fr. Dr. Jose Vettiyankal VC"
        posted="Posted on 28 February 2023"
      />
    </SimpleGrid>
  );
};

export default BlogPage;
