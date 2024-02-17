import APIClient from "../../services/apiClient";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ResendEmailVerify {
  userId: string;
  email: string;
}

interface FetchRespose {
  status: string;
  message: string;
}

const apiClient = new APIClient<FetchRespose, ResendEmailVerify>(
  "/users/resendOTPVerification"
);

const useResendEmail = () => {
  const toast = useToast();

  return useMutation<FetchRespose, Error, ResendEmailVerify>({
    mutationFn: (verifyEmail: ResendEmailVerify) =>
      apiClient.register(verifyEmail),

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

export default useResendEmail;
