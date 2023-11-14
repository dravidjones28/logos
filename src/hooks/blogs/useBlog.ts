import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import { BlogData } from "./useBlogs";

const apiClient = new APIClient<BlogData, null>("/blogs");

const useBlog = (slug: string) =>
  useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useBlog;
