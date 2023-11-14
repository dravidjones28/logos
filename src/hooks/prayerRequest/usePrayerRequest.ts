import APIClient from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface PrayerRequestData {
  _id?: string;
  fullName?: string;
  email?: string;
  message?: string;
}
const apiClient = new APIClient<PrayerRequestData[], null>("/prayerRequest");
const usePrayerRequests = () => {
  return useQuery({
    queryKey: ["prayerRequest"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default usePrayerRequests;
