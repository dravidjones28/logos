import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface BlogData {
  _id?: string;
  blogImage?: string;
  blogType?: string;
  blogTitle?: string;
  description?: string;
  uploadedDate?: string;
  authorName?: string;
  authorImage?: string;
}

const apiClient = new APIClient<BlogData[], null>("/blogs");
const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useBlogs;
