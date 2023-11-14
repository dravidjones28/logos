import AboutUsHero from "../components/aboutUs/AboutUsHero";
import CardKnowMore from "../components/aboutUs/CardKnowMore";
import LGBox from "../components/common/LGBox";
import { Box, Card, SimpleGrid } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import VincentianText from "../components/vincentianCongregation/VincentianText";
import VincentianPoints from "../components/vincentianCongregation/VincentianPoints";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const VincentianCongregation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <AboutUsHero
          bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873213/Logos%20Retreat%20Centre/vc_zvahb4.webp"
          title="Vincentian Congregation: Serving Faith and Community"
          subtitle="Preaching the Good News, Transforming Lives, and Building Communities Since 1904"
          buttonName="more about us"
          href="http://vincentiancongregation.org/"
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
            columns={{ base: 1, lg: 2 }}
            spacing={5}
            gap={10}
            mx={{ base: "10px", lg: "90px" }}
            my={{ base: "20px", lg: "60px" }}
          >
            <Box>
              <VincentianText
                title="Brief History"
                subtitle=" The Vincentian Congregation was born on November 20, 1904, in
                Thottakom, Kerala, thanks to Fr. Varkey Kattarath and his
                colleagues. Although the early community dispersed by 1915, a
                revival came in 1927 under the guidance of new leaders. The
                Congregation has grown ever since, officially taking its name in
                1938."
              />
              <VincentianText
                title="Our Mission"
                subtitle={`Inspired by St. Vincent de Paul, we focus on preaching the Good News to the poor. Our motto is simple but profound: "To preach the Good News to the poor" (Lk.4: 18)."`}
              />
            </Box>
            <CardKnowMore
              bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694870310/Logos%20Retreat%20Centre/vincent-de-paul_geqpgd.webp"
              title="Our Patron: St. Vincent De Paul"
              subtitle="His teachings and love for the marginalized are the pillars of our community."
              buttonName="know more"
              link="https://en.wikipedia.org/wiki/Vincent_de_Paul"
            />
          </SimpleGrid>

          <VincentianPoints
            title="What We Do"
            points={[
              "Popular Missions: Special retreats aimed at renewing entire parishes.",
              "Global Outreach: Spreading faith in places like Africa and South America.",
              "Social and Charitable Works: From cancer care centers to homes for the aged, we stand by the less fortunate.",
              "Education: Our schools, present both in India and Africa, focus on spiritual and intellectual growth.",
              "Clergy Support: We offer renewal programs and serve in parishes globally.",
            ]}
          />

          <Box mx={{ base: "10px", lg: "90px" }}>
            <VincentianText
              title="Our Reach"
              subtitle="Today, we're 572 priests and 184 seminarians strong, active across three provinces in India and several regions worldwide, including East Africa and Andhra Pradesh."
            />
            <VincentianText
              title="Join Us"
              subtitle="Whether it's Kerala, Tamil Nadu, or far-flung parts of the globe like the United States and Tanzania, Vincentians are there, making a difference. Come, be part of this incredible journey!"
            />
          </Box>
        </Card>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default VincentianCongregation;
