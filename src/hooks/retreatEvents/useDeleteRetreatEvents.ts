import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { RetreatEvents } from "./useRetreatEvents";
import APIClient from "../../services/apiClient";
import FullCalendar from "@fullcalendar/react";
import { MutableRefObject } from "react";

export interface AddRetreatEventsContext {
  previousRetreatEvents: RetreatEvents[];
}

const apiClient = new APIClient<RetreatEvents, null>("/retreatEvents");

const useDeleteRetreatEvents = (
  calendarRef: MutableRefObject<FullCalendar | null>,
  onDeleteClose: () => void
) => {
  const toast = useToast();
  const query = useQueryClient();

  return useMutation<RetreatEvents, Error, string, AddRetreatEventsContext>({
    mutationFn: (id: string) => apiClient.delete(id),

    onMutate: (retreatEventId) => {
      const previousRetreatEvents =
        query.getQueryData<RetreatEvents[]>(["retreatEvents"]) || [];

      query.setQueryData<RetreatEvents[]>(["retreatEvents"], (events) => {
        if (!events) return undefined;

        const random = events?.filter((event) => event._id !== retreatEventId);

        return random;
      });

      const updatedEvents =
        query.getQueryData<RetreatEvents[]>(["retreatEvents"]) || [];

      if (calendarRef.current) {
        calendarRef.current.getApi().removeAllEvents(); // Clear existing events
        calendarRef.current.getApi().addEventSource(updatedEvents); // Add updated events
      }

      onDeleteClose();

      return { previousRetreatEvents };
    },

    onSuccess: (_res, _retreatEvents) => {
      toast({
        title: "Success",
        description: "Successfully Deleted",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
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

export default useDeleteRetreatEvents;
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
