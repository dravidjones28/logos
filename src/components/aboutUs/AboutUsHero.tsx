import { Heading, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  bgImage: string;
  title: string;
  subtitle: string;
  buttonName: string;
  href?: string;
  link?: string;
}
const AboutUsHero = ({
  bgImage,
  title,
  subtitle,
  buttonName,
  href,
  link,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      opacity={0.9}
      width="100%"
      minHeight="40vh"
      color="#fff"
    >
      <Box px={{ base: "30px", lg: "145px" }} pt={10}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", xl: "5xl", lg: "4xl" }}
          fontWeight={700}
          maxWidth={500}
        >
          {title}
        </Heading>
        <Text fontSize={{ base: "15px", lg: "20px" }} maxWidth={500} mt={5}>
          {subtitle}
        </Text>

        <Button
          size={{ base: "md" }}
          onClick={() => {
            if (link) return navigate(`/${link}`);
            else if (href) {
              return window.open(href, "_blank");
            }
          }}
          my={10}
          colorScheme="blue"
          mb={20}
          textTransform="uppercase"
          fontWeight={500}
        >
          {buttonName}
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsHero;
