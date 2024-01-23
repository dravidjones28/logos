import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import { UsersData, UsersDataAll } from "./useUsers";
import { useToast } from "@chakra-ui/react";
import useUsersQuery from "../../store";

export interface AddUsersContext {
  previousTestimonial: UsersDataAll;
}
const apiClient = new APIClient<UsersDataAll, UsersData>("/users/setAdmins");
const useUsersEdit = (id: string, onClose: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const usersData = useUsersQuery((s) => s.usersData);

  return useMutation<UsersDataAll, Error, UsersData, AddUsersContext>({
    mutationFn: (data: UsersData) => apiClient.putData(data, id),
    onMutate: (newUsersData: UsersData) => {
      const previousUsersData =
        queryClient.getQueryData<UsersDataAll>(["users", usersData]) ||
        {
          // results: [],
          // next: undefined,
          // previous: undefined,
          // count: 0,
          // searchDateValuesLength: 0,
        };

      queryClient.setQueryData<UsersDataAll>(["users", usersData], (users) => {
        console.log(users);
        if (!users) return undefined;

        return {
          ...users,
          results: users?.results.map((user) =>
            user._id === id ? { ...user, ...newUsersData } : user
          ),
        };
      });
      return { previousTestimonial: previousUsersData } as AddUsersContext;
    },

    onSuccess: (_savedUsers, _newUser) => {
      toast({
        title: "Success",
        description: "Successfully Updated",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      onClose();
    },

    onError: (error, _testimonial, context) => {
      if (!context) return;
      queryClient.setQueryData<UsersDataAll>(
        ["testimonal"],
        context.previousTestimonial
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

export default useUsersEdit;
