import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";
import { RetreatEvents } from "../retreatEvents/useRetreatEvents";

export interface YourBooking {
  persons: any;
  events: RetreatEvents;
  // firstname: string;
}
const apiClient = new APIClient<YourBooking[], null>("/retreatBookings");

const useYourBookings = (token: string) =>
  useQuery({
    queryKey: ["retreatBookings"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useYourBookings;
