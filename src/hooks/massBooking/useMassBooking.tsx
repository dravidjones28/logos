import {
  useMutation,
  // useQueryClient
} from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
// import { useNavigate } from "react-router-dom";

interface MassBooking {
  bookingName: string;
  amount?: number;
  email: string;
  massType: string;
  normalIntentionTypes: string;
  normalIntentionField: string;
  gregorianIntentionField: string;
  time: string;
  totalDays?: number;
  weekdayCost?: number;
  weekdays?: number;
  weekendCost?: number;
  weekends?: number;
  massDate: string;
  author: string;
  phone: number;
}

const apiClient = new APIClient<string, MassBooking>("/massVerifyPayment");

const useMassBooking = () => {
  const toast = useToast();
  // const navigate = useNavigate();
  // const query = useQueryClient();

  return useMutation<string, Error, MassBooking>({
    mutationFn: (data: MassBooking) => apiClient.payment(data),
    onSuccess: async (res, _massBooking) => {
      try {
        const url = res;
        window.open(url);
        // navigate("/", { replace: true });
        // return query.clear();
      } catch (error) {
        toast({
          title: "Failed",
          description: `Payment Failed`,
          position: "top",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    },

    onError: (error) => {
      console.log(error);
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

export default useMassBooking;

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
