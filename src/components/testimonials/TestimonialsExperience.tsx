import { Box, Text } from "@chakra-ui/react";
interface Testimonial {
  title: String;
  des: String;
}
const TestimonialsExperience = ({ title, des }: Testimonial) => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box paddingTop={20} pb={2} width="550px">
        <Text
          fontSize="2.25rem"
          lineHeight={1.3}
          color="rgb(52, 71, 103)"
          fontWeight={700}
          letterSpacing="-0.125px"
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          textAlign="center"
          fontSize="1.2rem"
          px={8}
          fontWeight={400}
          lineHeight={1.625}
          color="rgb(73, 76, 92)"
          letterSpacing="-0.125px"
        >
          {des}
        </Text>
      </Box>
    </Box>
  );
};

export default TestimonialsExperience;
