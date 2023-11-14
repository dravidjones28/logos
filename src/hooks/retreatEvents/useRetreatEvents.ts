import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface RetreatEvents {
  _id?: string;
  title: string;
  start: string;
  ledBy: string;
  end: string;
  noOfDays: number;
  cost: string;
  slots: string;
}

const apiClient = new APIClient<RetreatEvents[], null>("/retreatEvents");
const useRetreatEvents = () => {
  return useQuery({
    queryKey: ["retreatEvents"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useRetreatEvents;
