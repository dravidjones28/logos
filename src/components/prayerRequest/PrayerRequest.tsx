import { Icon } from "@chakra-ui/icons";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PrayerRequest = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const navigate = useNavigate();
  const arrowTransition = "0.3s ease-in-out";
  const bgImage =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695629669/Logos%20Retreat%20Centre/adoration_Banner_y9jglx.webp";
  return (
    <Box
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
      mt="80px"
      mx={{ base: "30px", lg: "145px" }}
      minHeight="40vh"
      borderRadius="20px"
    >
      <Box
        paddingY="48px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize="1.875rem"
          lineHeight={1.375}
          textAlign="center"
          letterSpacing="-0.125px"
          fontWeight={700}
          color="#fff"
        >
          Submit Your Prayer Requests
        </Text>
        <Text
          fontSize={{ base: "1rem", lg: "1.375rem" }}
          fontWeight={400}
          textAlign="center"
          opacity={0.8}
          letterSpacing="-0.125px"
          color="#f3f3f3"
          width={{ base: "240px", lg: "500px" }}
        >
          Need Prayer? Our team is standing by to uplift you in prayer. Feel the
          comfort and strength of an army of intercessors supporting you
        </Text>
        <Flex mt={10}>
          <Text
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            color="#f3f3f3"
            marginRight="5px"
            fontSize="1.0625rem"
            lineHeight={1.6}
            fontWeight={500}
            cursor="pointer"
            onClick={() => navigate("/prayer-request")}
          >
            Pray for me
          </Text>
          <Icon
            as={FaArrowRight}
            boxSize={4}
            color="#f3f3f3"
            justifyContent="center"
            alignSelf="center"
            transform={hover ? "translateX(50%)" : "translateX(0)"}
            transition={hover ? arrowTransition : "0.3s ease-in-out"}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default PrayerRequest;
