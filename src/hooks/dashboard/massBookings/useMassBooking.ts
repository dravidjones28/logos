import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useMassBookingQuery from "../../../store";
import { YourBooking } from "../../massBooking/useMassBook";

import ms from "ms";

interface MassBookingAll {
  results: YourBooking[];
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  count?: number;
  searchDateValuesLength?: number;
}
const apiClient = new APIClient<MassBookingAll, null>("/massVerifyPayment/all");

const useMassBookingAll = () => {
  const massBookings = useMassBookingQuery((s) => s.massBookings);

  return useQuery({
    queryKey: ["massBookings", massBookings],
    queryFn: () =>
      apiClient.getAll1({
        params: {
          pageSize: massBookings.pageSize,
          page: massBookings.page,
          searchDate: massBookings.searchDate,
        },
      }),

    staleTime: ms("24h"),
  });
};

export default useMassBookingAll;
