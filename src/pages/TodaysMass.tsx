import YouTube from "react-youtube";
import LGBox from "../components/common/LGBox";
import { Box, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import useYoutubeLink from "../hooks/youtubeLink/useYoutubeLink";

const TodaysMass = () => {
  const { pathname } = useLocation();
  const { data: youtubeLink, isLoading, error } = useYoutubeLink();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (isLoading)
    return (
      <LGBox>
        <Box
          display="flex"
          height="70vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </LGBox>
    );
  if (error) throw error;

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <Box py={{ base: 3, lg: 5 }}>
          {youtubeLink?.map((item, index) => (
            <Box mx={{ base: "5px", lg: "145px" }} key={index}>
              <YouTube videoId={item.youtubeMassId} opts={opts} />
            </Box>
          ))}
        </Box>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default TodaysMass;
