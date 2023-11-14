import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { BlogData } from "./useBlogs";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export interface AddBlogContext {
  previousBlog: BlogData[];
}
const apiClient = new APIClient<BlogData, BlogData>("/blogs");

const useAddBlogs = (onAdd: () => void) => {
  const toast = useToast();
  const query = useQueryClient();
  const navigate = useNavigate();

  return useMutation<BlogData, Error, BlogData, AddBlogContext>({
    mutationFn: (data: BlogData) => apiClient.postData(data),

    onMutate: (blog) => {
      console.log(blog);
      const previousBlog = query.getQueryData<BlogData[]>(["blogs"]) || [];

      return { previousBlog };
    },

    onSuccess: (res, blog) => {
      toast({
        title: "Success",
        description: "Successfully Published",
        position: "top",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      query.setQueryData<BlogData[]>(["blogs"], (blogs = []) => {
        return [{ ...blog, _id: res._id }, ...blogs];
      });
      onAdd();
      navigate(`/blogs`);
    },

    onError: (error, _blog, context) => {
      if (!context) return;
      console.log(error);
      query.setQueryData<BlogData[]>(["blogs"], context.previousBlog);
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

export default useAddBlogs;
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
