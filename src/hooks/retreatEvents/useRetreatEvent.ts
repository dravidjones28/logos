import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import { RetreatEvents } from "./useRetreatEvents";

const apiClient = new APIClient<RetreatEvents, null>("/retreatEvents");

const useRetreatEvent = (slug: string) =>
  useQuery({
    queryKey: ["retreatEvents", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useRetreatEvent;
