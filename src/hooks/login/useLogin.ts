import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export interface Login {
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface FetchResponse1 {
  accessToken: string;
  name: string;
  isAdmin: boolean;
  _id: string;
}

const apiClient = new APIClient<FetchResponse1, Login>("/auth");

const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation<FetchResponse1, Error, Login>({
    mutationFn: (registerValues: Login) => apiClient.register(registerValues),

    onSuccess: (res, login) => {
      toast({
        title: "Successfully",
        description: "Logged in",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      const objectString = JSON.stringify({
        accesstoken: res.accessToken,
        name: res.name,
        email: login.email,
        isAdmin: res.isAdmin,
        _id: res._id,
      });
      const encryptedObject = CryptoJS.AES.encrypt(
        objectString,
        "secretKey"
      ).toString();
      sessionStorage.setItem("user", JSON.stringify(encryptedObject));
      navigate("/");
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

export default useLogin;

// Define the AxiosError type to ensure type safety
type AxiosError = {
  isAxiosError: true;
  response: {
    data: {
      message: string;
    };
  };
};
