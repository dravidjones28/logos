import LGBox from "../components/common/LGBox";
import { Flex, SimpleGrid, Text, Button, Box } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../components/common/db";
import useTestimonal from "../hooks/testimonial/useTestimonials";
import TestimonialComponent from "../components/testimonials/TestimonialComponent";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

const Testimonial = () => {
  const navigate = useNavigate();
  const { data: testimonails, error, isLoading } = useTestimonal();
  const session = db();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
  if (error) return <div>Error</div>;

  return (
    <LGBox>
      <Flex
        my={5}
        flex={1}
        justifyContent="space-between"
        mx={{ base: "30px", lg: "145px" }}
      >
        <Text
          color="rgb(52, 71, 103)"
          fontWeight={700}
          fontSize={{ base: "20px", lg: "30px" }}
          letterSpacing={1.1}
        >
          Testimonails
        </Text>
        {session?.isAdmin && (
          <Button
            fontSize="15px"
            fontWeight={500}
            marginLeft="20px"
            marginRight="10px"
            height="20px"
            borderRadius="7px"
            bg="#348ded"
            padding="20px"
            color="#fff"
            cursor="pointer"
            _hover={{ bg: "#70b7ff" }}
            onClick={() => {
              // onOpen();
              navigate("createTestimonial");
            }}
          >
            Create
          </Button>
        )}
      </Flex>
      {testimonails?.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Text fontWeight={500}>Sorry, no Testimonial</Text>
        </Box>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2, xl: 3 }}
        spacing={5}
        mx={{ base: "30px", lg: "145px" }}
        gap={20}
        justifyContent="center"
        mt={{ base: 20, lg: "90px" }}
      >
        {testimonails?.map((t) => (
          <TestimonialComponent
            _id={t._id ? t._id : ""}
            imageUrl={t.testimonialImage}
            name={t.testimonalName}
            dateNow={t.date ? t.date : undefined}
            des={t.description}
          />
        ))}
      </SimpleGrid>

      <Box mb={10}></Box>
    </LGBox>
  );
};

export default Testimonial;
