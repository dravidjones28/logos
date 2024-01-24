import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface VerifyPassword {
  userId: string;
  resetString: string | undefined;
  newPassword: string | undefined;
}

interface FetchResponse1 {
  data: string;
}

const apiClient = new APIClient<FetchResponse1, VerifyPassword>(
  "/users/resetPassword"
);

const useVerifyPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const query = useQueryClient();

  return useMutation<FetchResponse1, Error, VerifyPassword>({
    mutationFn: (registerValues: VerifyPassword) =>
      apiClient.register(registerValues),

    onSuccess: (res, _verifyPassword) => {
      toast({
        title: "Successfully",
        description: `${res}`,
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      sessionStorage.clear();
      query.clear();
      return navigate("/login");
    },
    onError: (error) => {
      if (error instanceof Error && "response" in error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError; // Type assertion to AxiosError

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

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export default useVerifyPassword;

// Define the AxiosError type to ensure type safety
type AxiosError = {
  isAxiosError: true;
  response: {
    data: {
      message: string;
    };
  };
};
