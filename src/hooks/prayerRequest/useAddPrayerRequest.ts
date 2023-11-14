import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { PrayerRequestData } from "./usePrayerRequest";
import APIClient from "../../services/apiClient";

export interface AddBlogContext {
  prevoiusPrayerRequest: PrayerRequestData[];
}
const apiClient = new APIClient<PrayerRequestData, PrayerRequestData>(
  "/prayerRequest"
);

const useAddPrayerRequest = (onAdd: () => void) => {
  const toast = useToast();
  const query = useQueryClient();

  return useMutation<
    PrayerRequestData,
    Error,
    PrayerRequestData,
    AddBlogContext
  >({
    mutationFn: (data: PrayerRequestData) => apiClient.postData(data),

    onMutate: (prayerRequest) => {
      console.log(prayerRequest);
      const prevoiusPrayerRequest =
        query.getQueryData<PrayerRequestData[]>(["prayerRequest"]) || [];

      return { prevoiusPrayerRequest };
    },

    onSuccess: (res, prayerRequest) => {
      toast({
        title: "Success",
        description: "Prayer Request Submitted",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      query.setQueryData<PrayerRequestData[]>(
        ["prayerRequest"],
        (prayerRequests1 = []) => {
          return [{ ...prayerRequest, _id: res._id }, ...prayerRequests1];
        }
      );
      onAdd();
    },

    onError: (error, _blog, context) => {
      if (!context) return;
      console.log(error);
      query.setQueryData<PrayerRequestData[]>(
        ["prayerRequest"],
        context.prevoiusPrayerRequest
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

export default useAddPrayerRequest;
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
