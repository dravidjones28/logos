import { Card, SimpleGrid, Center, Button, Box, Text } from "@chakra-ui/react";
import Details from "../common/details/Details";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const navigate = useNavigate();

  return (
    <Card
      mx={{ base: "22px", lg: 50 }}
      bg="#f3f3f3"
      position="relative"
      top={{ base: "-90px", lg: "-40px" }}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} p="40px">
        <Card
          flex={1}
          justifySelf="center"
          backgroundColor="#4b9df4"
          width={{ base: "250px", md: "100%", lg: "350px" }}
        >
          <Box p="90px 20px">
            <Center flexDirection="column">
              <Text
                m="0px 0px 0px 0.35rem"
                fontSize="1.875rem"
                lineHeight={1.375}
                fontWeight={700}
                letterSpacing="-0.125px"
                color="rgb(255, 255, 255)"
                textAlign="center"
                pb={3}
              >
                Learn More About Us
              </Text>
              <Text
                color="rgb(255, 255, 255)"
                fontWeight={400}
                lineHeight={1.6}
                fontSize="1.0625rem"
                textAlign="center"
                letterSpacing="-0.125px"
              >
                Intrigued? Read how Logos Retreat Centre has been transforming
                lives and renewing faith for years.
              </Text>
              <Button
                mt={5}
                onClick={() => {
                  navigate("/about-us");
                }}
              >
                Discover More
              </Button>
            </Center>
          </Box>
        </Card>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
          <Details
            title="Logos Retreat Centre"
            subText="Chosen by God to continue the ministry of Jesus, Logos Retreat Center is a beacon of spiritual growth and healing located in Bengaluru."
          />
          <Details
            title="Residential Retreats"
            subText="Join us every week for an opportunity to meet Jesus and experience God's touch and mercy through our ongoing residential retreats."
          />
          <Details
            title="Bible Conventions"
            subText="Join us every Friday, Saturday, and Sunday for Bible conventions in Kannada, English, Malayalam, and Tamil."
          />
          <Details
            title="Directed by Fr. Jose"
            subText="Led by Rev Dr. Fr. Jose Vettiyankal VC, the official exorcist of the Archdiocese of Bangalore, these retreats are life-changing!"
          />
        </SimpleGrid>
      </SimpleGrid>
    </Card>
  );
};

export default BookingSection;
