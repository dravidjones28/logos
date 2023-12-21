import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface TestimonialData {
  _id?: string;
  testimonialImage?: File;
  testimonalName: string;
  description: string;
  date?: Date;
}
const apiClient = new APIClient<TestimonialData[], null>("/testimonial");
const useTestimonal = () => {
  return useQuery({
    queryKey: ["testimonal"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useTestimonal;
