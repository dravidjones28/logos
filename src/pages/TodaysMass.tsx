import YouTube from "react-youtube";
import LGBox from "../components/common/LGBox";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";

const TodaysMass = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const opts = {
    height: "500",
    width: "100%",
    // https://developers.google.com/youtube/player_parameters
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <Box py={{ base: 3, lg: 5 }}>
          <Box mx={{ base: "5px", lg: "145px" }}>
            <YouTube videoId="PrKHOaGPKkg" opts={opts} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default TodaysMass;
