import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface FamilyMembers {
  firstName?: string;
  lastName?: string;
  age?: number;
  sex?: string;
  religion?: string;
}

export interface AllRetreatBookings {
  email?: string;
  bookingName?: string;
  firstName?: string;
  lastName?: string;
  familyMembers?: FamilyMembers[] | [];
  age?: number;
  sex?: string;
  religion?: string;
  address?: string;
  roomPreference?: string;
  contactNumber?: string;
  author?: string | undefined;
  eventId?: string | undefined;
}

const apiClient = new APIClient<string, AllRetreatBookings>("/retreatBookings");

const useAddRetreatBooking = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const query = useQueryClient();

  return useMutation<string, Error, AllRetreatBookings>({
    mutationFn: (data: AllRetreatBookings) => apiClient.payment(data),
    onSuccess: async (res, _massBooking) => {
      try {
        const url = res;
        window.open(url);
        navigate("/", { replace: true });
        return query.clear();
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

export default useAddRetreatBooking;

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
