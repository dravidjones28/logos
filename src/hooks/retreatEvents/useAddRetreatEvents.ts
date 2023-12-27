import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { RetreatEvents } from "./useRetreatEvents";
import APIClient from "../../services/apiClient";

export interface AddRetreatEventsContext {
  previousRetreatEvents: RetreatEvents[];
}

const apiClient = new APIClient<RetreatEvents, RetreatEvents>("/retreatEvents");

const useAddRetreatEvents = (onAdd: () => void, calendarRef: any) => {
  const toast = useToast();
  const query = useQueryClient();

  return useMutation<
    RetreatEvents,
    Error,
    RetreatEvents,
    AddRetreatEventsContext
  >({
    mutationFn: (data: RetreatEvents) => apiClient.postData(data),

    onMutate: (_retreatEvents) => {
      const previousRetreatEvents =
        query.getQueryData<RetreatEvents[]>(["retreatEvents"]) || [];

      return { previousRetreatEvents };
    },

    onSuccess: (res, retreatEvents) => {
      toast({
        title: "Success",
        description: "Successfully Published",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      query.setQueryData<RetreatEvents[]>(
        ["retreatEvents"],
        (retreatEventss = []) => {
          if (calendarRef && calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();

            calendarApi.addEvent({
              _id: res._id,
              title: res.title,
              start: res.start,
              end: res.end,
              ledBy: res.ledBy,
              noOfDays: res.noOfDays,
              nonAcCost: res.nonAcCost,
              acCost: res.acCost,
              slots: res.slots,
            });

            return [{ ...retreatEvents, _id: res._id }, ...retreatEventss];
          }
        }
      );
      onAdd();
    },

    onError: (error, _retreatEvents, context) => {
      if (!context) return;
      console.log(error);
      query.setQueryData<RetreatEvents[]>(
        ["retreatEvents"],
        context.previousRetreatEvents
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

export default useAddRetreatEvents;
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
