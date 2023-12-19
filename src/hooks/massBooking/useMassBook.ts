import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";

export interface YourBooking {
  _id: string;
  name_on_card: string;
  bank_ref_num: string;
  hash: string;
  firstname: string;
  net_amount_debit: string;
  payment_source: string;
  error_Message: string;
  issuing_bank: string;
  cardCategory: string;
  phone: string;
  easepayid: string;
  cardnum: string;
  unmappedstatus: string;
  PG_TYPE: string;
  addedon: string;
  cash_back_percentage: string;
  card_type: string;
  merchant_logo: string;
  upi_va: string;
  txnid: string;
  productinfo: string;
  bank_name: string;
  amount: string;
  mode: string;
  error: string;
  bankcode: string;
  deduction_percentage: string;
  email: string;
  massType: string;
  normalIntentionField: string;
  normalIntentionTypes: string;
  totalDays: string;
  weekdayCost: string;
  weekdays: string;
  weekendCost: string;
  weekends: string;
  gregorianIntentionField: string;
  author: string;
  massDate: string;
}
const apiClient = new APIClient<YourBooking[], null>("/massVerifyPayment");

const useMassBook = (token: string) =>
  useQuery({
    queryKey: ["massVerifyPayment"],
    queryFn: () => apiClient.getWithAccess(token),
    staleTime: ms("24h"),
  });

export default useMassBook;
