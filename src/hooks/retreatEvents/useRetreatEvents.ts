import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";

export interface RetreatEvents {
  _id?: string;
  title: string;
  start: string;
  ledBy: string;
  end: string;
  noOfDays: string;
  cost: string;
  slots: string;
}

const apiClient = new APIClient<RetreatEvents[], null>("/retreatEvents");
const useRetreatEvents = () => {
  return useQuery({
    queryKey: ["retreatEvents"],
    queryFn: apiClient.getAll,
  });
};

export default useRetreatEvents;
