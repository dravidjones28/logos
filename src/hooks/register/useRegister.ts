import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface Register {
  name: string;
  email: string;
  password: string;
  verified?: boolean;
  isAdmin?: boolean;
  profilePic?: string;
  isEditor?: boolean;
}

interface FetchResponse1 {
  status: string;
  message: string;
  data: {
    userId: string;
    email: string;
  };
}

const apiClient = new APIClient<FetchResponse1, Register>("/users");

const useAddRegister = () => {
  const toast = useToast();

  const navigate = useNavigate();

  return useMutation<FetchResponse1, Error, Register>({
    mutationFn: (registerValues: Register) =>
      apiClient.register(registerValues),

    onSuccess: (res, register) => {
      toast({
        title: "Please Verify your Email",
        description: `An email with a verification code was just sent to ${register.email}
        `,
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      return navigate(`/verifyEmail/${res.data.userId}/${res.data.email}`);
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

export default useAddRegister;

// Define the AxiosError type to ensure type safety
type AxiosError = {
  isAxiosError: true;
  response: {
    data: {
      message: string;
    };
  };
};
