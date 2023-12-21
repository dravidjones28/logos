import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { TestimonialData } from "./useTestimonials";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface AddTestimonialContext {
  previousTestimonial: TestimonialData[];
}
const apiClient = new APIClient<TestimonialData, TestimonialData>(
  "/testimonial"
);

const useAddTestimonial = (onAdd: () => void) => {
  const toast = useToast();
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    TestimonialData,
    Error,
    TestimonialData,
    AddTestimonialContext
  >({
    mutationFn: (data: TestimonialData) => apiClient.postDataFile(data),

    onMutate: (testimonial) => {
      console.log(testimonial);
      const previousTestimonial =
        query.getQueryData<TestimonialData[]>(["testimonal"]) || [];

      return { previousTestimonial };
    },

    onSuccess: (res, testimonial) => {
      console.log(res);
      console.log(testimonial);
      toast({
        title: "Success",
        description: "Successfully Published",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      query.setQueryData<TestimonialData[]>(
        ["testimonal"],
        (testimonials = []) => {
          return [{ ...testimonial, _id: res._id }, ...testimonials];
        }
      );

      onAdd();
      navigate("/testimonials");
    },

    onError: (error, _testimonial, context) => {
      if (!context) return;
      query.setQueryData<TestimonialData[]>(
        ["testimonal"],
        context.previousTestimonial
      );
      if (error instanceof Error && "response" in error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError; // Type assertion to AxiosError

          console.log(axiosError.response.data);
          // Check if error.response exists before accessing .data
          if (axiosError.response) {
            const errorMessage = axiosError.response.data;
            toast({
              title: "Failed",
              description: `${errorMessage}`,
              position: "top",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          } else {
            toast({
              title: "Failed",
              description: "Sorry, something happend",
              position: "top",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          }
        }
      }
    },
  });
};

export default useAddTestimonial;

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

type AxiosError = {
  isAxiosError: true;
  response: {
    data: {
      message: string;
    };
  };
};
