import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";

export interface YourBooking {
  _id: string;
  weekdays: number;
  weekends: number;
  massDate: string[];
  bookingName: string;
  time: string;
  email: string;
  massType: string;
  normalIntentionField: string;
  normalIntentionTypes: string;
  gregorianIntentionField: string;
  phone: number;
  date?: any;
  amount: number;
}
const apiClient = new APIClient<YourBooking[], null>("/massVerifyPayment");

const useMassBook = (token: string) =>
  useQuery({
    queryKey: ["massVerifyPayment"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useMassBook;
