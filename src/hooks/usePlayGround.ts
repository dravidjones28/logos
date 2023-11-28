import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface AddTestimonialContext {
  previousTestimonial: [];
}
const apiClient = new APIClient<[], []>("/initiatePayment");

const usePlayGround = () => {
  const toast = useToast();
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation<any, Error, {}, AddTestimonialContext>({
    mutationFn: (data: any) => apiClient.postData(data),

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
    },
  });
};

export default usePlayGround;

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
