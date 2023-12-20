import { Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Typewriter from "react-ts-typewriter";

const Hero = () => {
  const navigate = useNavigate();
  const bgImage =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1692125319/Logos%20Retreat%20Centre/Jesus_l1qrkx.jpg";
  return (
    <Box pt="70px">
      <Box
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
        width="100%"
        minHeight={{ base: "75vh", lg: "90vh" }}
      >
        <Box
          mx={{ lg: "100px", base: "20px" }}
          paddingTop={{ base: 15, md: 20 }}
          pt={{ lg: 20 }}
        >
          <Text
            fontSize={{ base: "4xl", lg: "5xl" }}
            color="white"
            fontWeight={500}
            maxW={400}
            pt={{ base: 19, lg: 0 }}
          >
            Encounter God&apos;s {""}
            <Typewriter
              speed={90}
              text={["divine mercy", "healing grace", "abundant love"]}
              loop={true}
            />
          </Text>
          <Text
            fontSize={{ base: "1rem", lg: "1.375rem" }}
            color="white"
            fontWeight={500}
            opacity={0.8}
            mt={1}
            mb={3}
          >
            Join us at Logos Retreat Centre, where miracles unfold,
            <br />
            bondages break, and lives are forever transformed.
          </Text>
          <Box display="flex" alignItems="center" mb={10} gap={5} p={5}>
            <Button
              size={{ base: "md", md: "lg" }}
              onClick={() => {
                navigate("/book-retreat");
              }}
            >
              <Text fontSize={{ base: "13px", lg: "15px" }}>
                Book a retreat
              </Text>
            </Button>
            <Button
              size={{ base: "md", md: "lg" }}
              onClick={() => {
                navigate("/mass-offering");
              }}
            >
              <Text fontSize={{ base: "13px", lg: "15px" }}>Offer mass</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
