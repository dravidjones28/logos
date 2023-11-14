import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import FacilitiesCard from "../components/facilities/FacilitiesCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Facilities = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LGBox>
      <Box display="flex" justifyContent="center" mt={5}>
        <Box textAlign="center">
          <Text fontSize={{ base: "30px", lg: "35px" }} fontWeight={700}>
            Your Spiritual Sanctuary
          </Text>
          <Text fontSize="20px" maxWidth="400px">
            Our humble yet comfortable facilities are designed to foster deep
            spiritual connections and renewal.
          </Text>
        </Box>
      </Box>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={5}
        gap={10}
        mx={{ base: "30px", lg: "80px", xl: "145px" }}
        mb={10}
      >
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695231597/Logos%20Retreat%20Centre/confession_jd1ia4.webp"
          title="Spiritual Guidance"
          des="Confession and counseling sessions available during every retreat for spiritual well-being."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232065/Logos%20Retreat%20Centre/heal1_j7cn67.jpg"
          title="Uplifting Worship"
          des="Experience amazing praise and worship sessions, along with powerful teachings."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232217/Logos%20Retreat%20Centre/logos1_blwg5b.jpg"
          title="Healing Services"
          des="Deliverance and healing activities are a core part of every Logos retreat."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232218/Logos%20Retreat%20Centre/mass1_p8q1sa.jpg"
          title="Daily Holy Mass"
          des="Attend Holy Mass every day to enrich your spiritual life during your stay."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232065/Logos%20Retreat%20Centre/ador1_gcdl3z.jpg"
          title="Eucharistic Adoration"
          des="Participate in adoration to deepen your relationship with the Divine Presence."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232810/Logos%20Retreat%20Centre/inter1_n4i6rd.jpg"
          title="24/7 Intercession"
          des="Benefit from round-the-clock intercessory prayers offered by dedicated intercessors."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232810/Logos%20Retreat%20Centre/room1_jvq6w2.jpg"
          title="Room Choices"
          des="Choose between private and sharing rooms, as well as air-conditioned or non-AC options."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695231432/Logos%20Retreat%20Centre/food-logos_vfnyel.webp"
          title="Quality Food"
          des="Enjoy good, hygienic food with options for both vegetarian and non-vegetarian meals."
        />
        <FacilitiesCard
          img="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695232810/Logos%20Retreat%20Centre/hot-cold-water_veluls.jpg"
          title="Hot & Cold Water"
          des="Enjoy the comfort of 24/7 hot and cold water supply on every floor."
        />
      </SimpleGrid>
    </LGBox>
  );
};

export default Facilities;
