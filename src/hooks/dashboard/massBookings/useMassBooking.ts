import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useMassBookingQuery from "../../../store";
import { YourBooking } from "../../massBooking/useMassBook";

import ms from "ms";

interface MassBookingAll {
  result: YourBooking[];
  totalCount: number;
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
          searchDate: massBookings.massDate,
        },
      }),

    staleTime: ms("24h"),
  });
};

export default useMassBookingAll;
