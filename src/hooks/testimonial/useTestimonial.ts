import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import { TestimonialData } from "./useTestimonials";

const apiClient = new APIClient<TestimonialData, null>("/testimonial");

const useTestimonial = (slug: string) =>
  useQuery({
    queryKey: ["testimonal", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useTestimonial;
