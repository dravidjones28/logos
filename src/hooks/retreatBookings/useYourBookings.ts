import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";
import { FamilyMembers } from "./useAddRetreatBookings";
import { RetreatEvents } from "../retreatEvents/useRetreatEvents";

export interface RetreatBooking {
  email?: string;
  bookingName?: string;
  firstName?: string;
  lastName?: string;
  familyMembers?: FamilyMembers[] | [];
  age?: number;
  sex?: string;
  bookingForFamilyOrIndividual?: string;
  religion?: string;
  address?: string;
  roomPreference?: string;
  contactNumber?: string;
  author?: string | undefined;
  events: RetreatEvents;
  amount: number;
}
const apiClient = new APIClient<RetreatBooking[], null>("/retreatBookings");

const useYourBookings = (token: string) =>
  useQuery({
    queryKey: ["retreatBookings"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useYourBookings;
