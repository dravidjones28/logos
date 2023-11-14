import LGBox from "../components/common/LGBox";
import { Box, Card } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import AboutUsHero from "../components/aboutUs/AboutUsHero";
import AboutUsSection from "../components/aboutUs/AboutUsSection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AboutUs = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <AboutUsHero
          bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694868335/Logos%20Retreat%20Centre/Center_ttlkgs.webp"
          title="Logos Retreat Center: Where Faith Meets Restoration"
          subtitle="Experience inner healing through the Word of God, year-round retreats
        and 24/7 intercession."
          buttonName="Book a retreat"
          link="bookRetreat"
        />
        <Card
          mx={{ base: "10px", lg: "20px" }}
          mt="20px"
          position="relative"
          top="-70px"
          px={10}
          pb={20}
        >
          <AboutUsSection />
        </Card>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default AboutUs;
