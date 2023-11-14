import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";

export interface YourBooking {
  fullName: string | undefined;
  email: string | undefined;
  massType: string | undefined;
  intention?: string | undefined;
  dates: string[] | undefined;
  totalCost: Number | undefined;
  amount: Number | undefined;
  totalDays: Number | undefined;
  weekdayCost: Number | undefined;
  weekdays: Number | undefined;
  weekendCost: Number | undefined;
  weekends: Number | undefined;
  razorpay_payment_id: string;
  razorpay_order_id: string;
}
const apiClient = new APIClient<YourBooking[], null>("/massVerifyPayment");

const useMassBook = (token: string) =>
  useQuery({
    queryKey: ["massVerifyPayment"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useMassBook;
