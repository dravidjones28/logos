import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { ContactUsData } from "./useContactUs";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface AddContentUsContext {
  previousContactUs: ContactUsData[];
}
const apiClient = new APIClient<ContactUsData, ContactUsData>("/contactUs");

const useAddContactUs = (onAdd: () => void) => {
  const toast = useToast();
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ContactUsData, Error, ContactUsData, AddContentUsContext>({
    mutationFn: (data: ContactUsData) => apiClient.postData(data),

    onMutate: (contactUs) => {
      console.log(contactUs);
      const previousContactUs =
        query.getQueryData<ContactUsData[]>(["contactUs"]) || [];

      return { previousContactUs };
    },

    onSuccess: (res, contactUs) => {
      toast({
        title: "Success",
        description: "Your Request is Submitted",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      query.setQueryData<ContactUsData[]>(["contactUs"], (contactUss = []) => {
        return [{ ...contactUs, _id: res._id }, ...contactUss];
      });
      onAdd();
      navigate("/");
    },

    onError: (error, _blog, context) => {
      if (!context) return;
      console.log(error);
      query.setQueryData<ContactUsData[]>(
        ["contactUs"],
        context.previousContactUs
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

export default useAddContactUs;
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
