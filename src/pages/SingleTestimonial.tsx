import { useEffect, useRef } from "react";
import {
  Spinner,
  Box,
  Heading,
  Card,
  Text,
  Avatar,
  TextProps,
} from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import { useLocation, useParams } from "react-router-dom";
import useTestimonal from "../hooks/testimonial/useTestimonial";

const TextWithLineBreaks: React.FC<TextProps> = ({ children, ...rest }) => (
  <Text whiteSpace="pre-line" {...rest}>
    {children}
  </Text>
);
const SingleTestimonial = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const { slug } = useParams();
  const { data: testimonial, error, isLoading } = useTestimonal(slug!);

  useEffect(() => {
    if (boxRef.current) {
      const boxHeight = boxRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      console.log(windowHeight);
      if (boxHeight > windowHeight) {
        boxRef.current.style.height = "100%";
      } else {
        boxRef.current.style.height = "100vh";
      }
    }
  }, [!isLoading]);

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
  if (error || !testimonial) throw error;

  return (
    <Box bg="#eef0f3" ref={boxRef}>
      <LGBox>
        <Box mx={{ base: "10px", lg: "30px" }}>
          <Card mx={{ base: "10px", lg: "20px" }} mt="50px">
            <Box position="absolute" top="-34px" left="70px">
              <Avatar
                src={
                  testimonial.testimonialImage
                    ? `${testimonial.testimonialImage}`
                    : "https://bit.ly/broken-link"
                }
                size="lg"
                name={testimonial.testimonalName}
                color="#fff"
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              my={10}
              mx="130px"
            >
              <Box>
                <Heading fontSize="5xl" mb={10}>
                  {testimonial.testimonalName}
                </Heading>
                <TextWithLineBreaks>
                  {testimonial.description}
                </TextWithLineBreaks>
              </Box>
            </Box>
          </Card>
        </Box>
      </LGBox>
    </Box>
  );
};

export default SingleTestimonial;
