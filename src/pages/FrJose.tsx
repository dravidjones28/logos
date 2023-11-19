import AboutUsHero from "../components/aboutUs/AboutUsHero";
import CardKnowMore from "../components/aboutUs/CardKnowMore";
import LGBox from "../components/common/LGBox";
import { Box, Card, SimpleGrid } from "@chakra-ui/react";
import VincentianText from "../components/vincentianCongregation/VincentianText";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const FrJose = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <AboutUsHero
          bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694867820/Logos%20Retreat%20Centre/adoration_hkzmcz.webp"
          title="Rev. Dr. Jose Vettiyankal VC"
          subtitle="A Life Dedicated to Faith, Healing, and Spiritual Leadership"
          buttonName="request prayers"
          link="prayerRequest"
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
            gap={{ base: 0, lg: 10 }}
            mx={{ base: "0px", lg: "90px" }}
            my={{ base: "20px", lg: "60px" }}
          >
            <Box>
              <VincentianText
                title="Early Life and Calling"
                subtitle="From a young age, Rev. Dr. Jose Vettiyankal VC was deeply passionate about the teachings of the Gospel and dedicated himself to the Church. His enduring commitment led him to his ordination on January 4, 1988—a significant milestone that would set the stage for an impactful life of service."
              />
              <VincentianText
                title="A Global Preacher"
                subtitle="Soon after his ordination, Rev. Dr. Jose answered the call to spread the Gospel and has since preached across continents, touching lives in corners far and wide. His sermons are not merely lectures; they are conversations with the community, engagements of the heart, and challenges to the mind."
              />
            </Box>
            <CardKnowMore
              bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1692177199/Logos%20Retreat%20Centre/fr_jose_qrbnlm.webp"
              title="Rev. Dr. Jose Vettiyankal VC"
              subtitle="Fr. Jose reads every email that is sent to him and prays for everyone who asks him for prayer. He responds to every email himself."
              buttonName="write to fr.jose"
              href="/"
            />
          </SimpleGrid>

          <Box mx={{ base: "10px", lg: "90px" }}>
            <VincentianText
              title="Judicial Contributions and Ecclesiastical Roles"
              subtitle="His clerical journey also led him to serve as a tribunal judge in the Archdiocese of Mylapore in Tamil Nadu and as a defender of Bond in the Archdiocese of Kottayam in Kerala. His legal acumen and fairness in judgment have made significant contributions to the ecclesiastical legal system."
            />
            <VincentianText
              title="Leadership in the Vincentian Congregation"
              subtitle="Rev. Dr. Jose's leadership qualities were soon recognized, leading him to become the Provincial Superior of the St. Joseph Province of the Vincentian Congregation. His tenure was marked by organizational growth, strengthened community ties, and a deepening of the spiritual practices within the Congregation."
            />
            <VincentianText
              title="Founding Logos Retreat Centre"
              subtitle="Perhaps one of his most impactful contributions has been the founding of Logos Retreat Centre in Bengaluru, India. Under his able leadership as the current Director, the Centre has flourished into a sanctuary for spiritual nourishment, inner healing, and robust theological dialogue. People from all walks of life arrive broken, empty, and spiritually famished only to leave rejuvenated and fulfilled. Logos Retreat Centre is not merely a venue; it's a life-changing experience—testimony to Rev. Dr. Jose's vision and commitment."
            />
            <VincentianText
              title="An Appointed Exorcist"
              subtitle="Adding a unique facet to his multifaceted vocation, Rev. Dr. Jose is the official Exorcist of the Archdiocese of Bengaluru. In this critical role, he has provided invaluable service to those plagued by spiritual turmoil, reinforcing the Church's role as a sanctuary for all forms of healing."
            />
            <VincentianText
              title="A Lasting Legacy"
              subtitle={`From the pulpit to the courtroom, from retreat centers to the chambers of spiritual deliverance, Rev. Dr. Jose Vettiyankal VC’s life journey has been a beacon of inspiration. Through his leadership at Logos Retreat Centre, he continues to embody the Center's mission: "To form every person in the fullness of the Gospel," enriching not just individual lives but fostering a more compassionate, understanding world.`}
            />
          </Box>
        </Card>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default FrJose;
