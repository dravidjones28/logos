import APIClient from "../../services/apiClient";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface VerifyEmail {
  userId: string;
  otp: string;
}

interface FetchRespose {
  status: string;
  message: string;
}

const apiClient = new APIClient<FetchRespose, VerifyEmail>("/users/verifyOTP");

const useVerifyEmail = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation<FetchRespose, Error, VerifyEmail>({
    mutationFn: (verifyEmail: VerifyEmail) => apiClient.register(verifyEmail),

    onSuccess: (res, _verify) => {
      toast({
        title: "Success",
        description: `${res.message}
        `,
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      return navigate(`/login`);
    },
    onError: (error) => {
      if (error instanceof Error && "response" in error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError; // Type assertion to AxiosError

          // Check if error.response exists before accessing .data
          if (axiosError.response) {
            const errorMessage = axiosError.response.data;
            console.log(errorMessage);
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

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export default useVerifyEmail;
