import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface ContactUsData {
  _id?: string;
  fullName?: string;
  email?: string;
  message?: string;
}
const apiClient = new APIClient<ContactUsData[], null>("/contactUs");
const useContactUs = () => {
  return useQuery({
    queryKey: ["contactUs"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useContactUs;
