import { useLocation } from "react-router-dom";
import LGBox from "../components/common/LGBox";
import {
  Card,
  Heading,
  Image,
  Text,
  Box,
  Center,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";

interface Props {
  title: string;
  subtitle: string;
}
const TypesMassText = ({ title, subtitle }: Props) => {
  return (
    <Box my={3}>
      <Heading fontSize="20px" fontWeight={500}>
        {title}
      </Heading>
      {/* <Flex flex={1} justifyContent="center"> */}
      <Text fontSize="16px" maxWidth="350px" mt={2}>
        {subtitle}
      </Text>
      {/* </Flex> */}
    </Box>
  );
};
const TypesOfMass = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <Box py={{ base: 3, lg: 5 }}>
          <Grid
            templateAreas={{
              base: `"typesOfMass"`,
              lg: `"image typesOfMass"`,
            }}
            templateColumns={{
              base: "1fr",
              lg: "1fr 1fr",
            }}
            mx={{ base: "5px", lg: "20px" }}
            p={{ base: "10px", lg: "10px" }}
            gap={10}
          >
            <Show above="xl">
              <GridItem area="image">
                <Center>
                  <Image
                    borderRadius="10px"
                    height="630px"
                    src="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694845701/Logos%20Retreat%20Centre/BIBLE_akyc8p.jpg"
                  />
                </Center>
              </GridItem>
            </Show>

            <GridItem area="typesOfMass">
              <Card bg="#4a8edd" color="#fff" p={10} height="100%">
                <Heading fontSize="3xl" fontWeight={700} mb={5}>
                  Types of Mass Offerings
                </Heading>
                <TypesMassText
                  title=" Why Offer a Mass?"
                  subtitle=" Offering a Mass is a powerful way to gain God's grace and aid the
        journey to salvation for you and others."
                />
                <TypesMassText
                  title="Normal Mass Intention"
                  subtitle="A Normal Mass Intention is when you request a Mass to be offered for a specific intention like praying for a loved one, a special occasion, or a particular need."
                />
                <TypesMassText
                  title="Gregorian Mass Intention"
                  subtitle="A Gregorian Mass Intention involves offering 30 consecutive Masses for a departed soul, helping it in its spiritual journey."
                />
              </Card>
            </GridItem>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default TypesOfMass;
