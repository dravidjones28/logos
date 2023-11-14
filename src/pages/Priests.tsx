import { Card, SimpleGrid, Box } from "@chakra-ui/react";
import AboutUsHero from "../components/aboutUs/AboutUsHero";
import LGBox from "../components/common/LGBox";
import Footer from "../components/footer/Footer";
import PriestTeam from "../components/Priest/PriestTeam";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Priests = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <AboutUsHero
          bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1695020853/Logos%20Retreat%20Centre/priests_ficqg1.webp"
          title="Meet Our Spiritual Leaders"
          subtitle="Leading by example in faith, service, and community love."
          buttonName="connect with out preiests"
        />
        <Card
          mx={{ base: "10px", lg: "20px" }}
          mt="20px"
          position="relative"
          top="-70px"
          px={10}
          pb={20}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={5}
            gap={10}
            mx={{ base: "10px", lg: "90px" }}
            my={{ base: "20px", lg: "60px" }}
          >
            <PriestTeam />
          </SimpleGrid>
        </Card>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default Priests;
