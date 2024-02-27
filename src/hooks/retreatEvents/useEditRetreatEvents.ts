import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { RetreatEvents } from "./useRetreatEvents";
import APIClient from "../../services/apiClient";
import FullCalendar from "@fullcalendar/react";
import { MutableRefObject } from "react";

export interface AddRetreatEventsContext {
  previousRetreatEvents: RetreatEvents[];
}

const apiClient = new APIClient<RetreatEvents, RetreatEvents>("/retreatEvents");

const useEditRetreatEvents = (
  onAdd: () => void,
  id: string,
  calendarRef: MutableRefObject<FullCalendar | null>
) => {
  const toast = useToast();
  const query = useQueryClient();

  return useMutation<
    RetreatEvents,
    Error,
    RetreatEvents,
    AddRetreatEventsContext
  >({
    mutationFn: (data: RetreatEvents) => apiClient.putData(data, id),

    onMutate: (retreatEvents) => {
      const previousRetreatEvents =
        query.getQueryData<RetreatEvents[]>(["retreatEvents"]) || [];

      query.setQueryData<RetreatEvents[]>(["retreatEvents"], (events) => {
        if (!events) return [];

        const ev = events.map((item) => {
          if (item._id?.toString() === id) {
            return { _id: id, ...retreatEvents };
          } else {
            return item;
          }
        });

        return ev;
      });

      const updatedEvents =
        query.getQueryData<RetreatEvents[]>(["retreatEvents"]) || [];

      console.log(calendarRef);

      onAdd();

      if (calendarRef.current) {
        calendarRef.current.getApi().removeAllEvents(); // Clear existing events
        calendarRef.current.getApi().addEventSource(updatedEvents); // Add updated events
      }

      return { previousRetreatEvents };
    },

    onSuccess: (_res, _retreatEvents) => {
      toast({
        title: "Success",
        description: "Successfully Edited",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

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

export default useEditRetreatEvents;
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
