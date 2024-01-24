import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import useTestimonal from "../../hooks/testimonial/useTestimonials";
import LGBox from "../common/LGBox";
import TestimonialComponent from "./TestimonialComponent";

const Testimonials = () => {
  const { data: testimonails, error, isLoading } = useTestimonal();

  const firstThree = testimonails?.slice(0, 3);

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
    <>
      <SimpleGrid
        columns={{ base: 1, lg: 2, xl: 3 }}
        spacing={5}
        mx={{ base: "30px", lg: "145px" }}
        gap={20}
        justifyContent="center"
        mt={{ base: 20, lg: "90px" }}
      >
        {firstThree?.map((t) => (
          <TestimonialComponent
            key={t._id}
            _id={t._id ? `testimonials/${t._id}` : ""}
            imageUrl={t.testimonialImage}
            name={t.testimonalName}
            dateNow={t.date ? t.date : undefined}
            des={t.description}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Testimonials;
