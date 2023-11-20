import { SimpleGrid } from "@chakra-ui/react";
import Blog from "./Blog";

const BlogPage = () => {
  const author1 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp";

  const author2 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694877759/Logos%20Retreat%20Centre/Fr.-George-Pallickamyalil_wfaimo.webp";

  const author3 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695020307/Logos%20Retreat%20Centre/Fr.-Var_pksgbr.webp";

  const post1 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/silent-retreat_hkxv00.webp";

  const post2 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/inner-healing_ihrwf3.webp";

  const post3 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695273650/Logos%20Retreat%20Centre/intercession_lzcmyk.webp";
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={5}
      gap={10}
      mx={{ base: "30px", lg: "145px" }}
    >
      <Blog
        blogImage={post1}
        blogType="SPIRITUAL GROWTH"
        title="Unlocking The Power Of Silent Retreats"
        authorImage={author1}
        authorName="Rev. Fr. Dr. Jose Vettiyankal VC"
        posted="Posted on 28 February 2023"
        slug="655bb049de6b08001c442dca"
      />
      <Blog
        blogImage={post2}
        blogType="Inner Healing"
        title="The Essence of Inner Healing Retreats"
        authorImage={author2}
        authorName="Rev. Fr. George Pallikamyalil VC"
        posted="Posted on 15 August 2023"
        slug="655bb049de6b08001c442dca"
      />
      <Blog
        blogImage={post3}
        blogType="Prayers"
        title="Role of Intercession in Modern Times"
        authorImage={author3}
        authorName="Rev. Fr. Varghese Thomas VC"
        posted="Posted on 5 Septebmer 2023"
        slug="655bb049de6b08001c442dca"
      />
    </SimpleGrid>
  );
};

export default BlogPage;
