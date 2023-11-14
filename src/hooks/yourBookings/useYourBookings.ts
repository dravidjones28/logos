import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";
import { RetreatEvents } from "../retreatEvents/useRetreatEvents";

export interface YourBooking {
  persons: any;
  eventId: RetreatEvents;
  amount: number;
  bookingName: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
}
const apiClient = new APIClient<YourBooking[], null>("/verifyPayment");

const useYourBookings = (token: string) =>
  useQuery({
    queryKey: ["verifyPayment"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useYourBookings;
