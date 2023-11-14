import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import YouTube from "react-youtube";

const YoutubeSection = () => {
  const opts = {
    height: "360",
    width: "100%",
    // https://developers.google.com/youtube/player_parameters
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <Box bg="blackAlpha.800" width="100%">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        py={{ base: "40px", lg: "50px" }}
        px={{ base: "30px", lg: "130px" }}
        spacing={10}
      >
        <Box flex={1} alignSelf="center">
          <Text
            fontSize="2.25rem"
            fontWeight={700}
            letterSpacing="-0.125px"
            lineHeight={1.3}
            color="#fff"
            mb={5}
          >
            Join Our Daily Retreat for Healing, Deliverance, and Anointing
          </Text>
          <Text
            fontSize="1.0625rem"
            lineHeight={1.6}
            opacity={0.8}
            letterSpacing="-0.125px"
            color="#fff"
            mb={10}
          >
            Every day brings a new opportunity for spiritual growth. Click to
            join today's retreat and experience the transformative power of
            healing, deliverance, and anointing.
          </Text>
        </Box>
        <YouTube videoId="PrKHOaGPKkg" opts={opts} />
      </SimpleGrid>
    </Box>
  );
};

export default YoutubeSection;
