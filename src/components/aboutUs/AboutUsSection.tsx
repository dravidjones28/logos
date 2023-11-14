import { SimpleGrid } from "@chakra-ui/react";
import AboutLogos from "./AboutLogos";
import AboutUsSubcribe from "./AboutUsSubcribe";
import CountUpComponent from "./CountUpComponent";
import Team from "./Team";
import IntercessionComponent from "./IntercessionComponent";

const AboutUsSection = () => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={5}
        gap={10}
        mx={{ base: "10px", lg: "90px" }}
        my={{ base: "20px", lg: "60px" }}
      >
        <CountUpComponent
          end={10}
          decimals={3}
          title="Testimonies"
          subTitle=" of miraculous healings, financial breakthroughs, restored
                  relationships, spiritual renewals, and other life-changing
                  transformations!"
        />
        <CountUpComponent
          end={60}
          decimals={0}
          title="Retreats"
          subTitle="throughout the year - catering to different age groups, backgrounds, and languages, offering spiritual enlightenment and personal growth"
        />
        <IntercessionComponent
          title="Intercession"
          subTitle="to lift up prayer requests pouring in from every corner of the globe, standing in the gap and asking for God's mercy for all in need."
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={5}
        gap={10}
        my={{ base: "20px", lg: "60px" }}
        mx={{ base: "10px", lg: "40px" }}
      >
        <AboutLogos />
      </SimpleGrid>
      <Team />
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={5}
        gap={20}
        mx={{ base: "30px", lg: "50px" }}
        mt={{ base: "70px", lg: "50px" }}
      >
        <AboutUsSubcribe />
      </SimpleGrid>
    </>
  );
};

export default AboutUsSection;
