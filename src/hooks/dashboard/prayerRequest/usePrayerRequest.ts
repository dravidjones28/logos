import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useMassBookingQuery from "../../../store";
import { PrayerRequestData } from "../../prayerRequest/usePrayerRequest";

import ms from "ms";

interface PrayerRequestBookingAll {
  result: PrayerRequestData[];
  totalCount: number;
}
const apiClient = new APIClient<PrayerRequestBookingAll, null>(
  "/prayerRequest/all"
);

const useMassBookingAll = () => {
  const prayerRequestBooking = useMassBookingQuery((s) => s.prayerRequest);

  return useQuery({
    queryKey: ["prayerRequestBookingsAll", prayerRequestBooking],
    queryFn: () =>
      apiClient.getAll1({
        params: {
          pageSize: prayerRequestBooking.pageSize,
          page: prayerRequestBooking.page,
          searchDate: prayerRequestBooking.searchDate,
        },
      }),

    staleTime: ms("24h"),
  });
};

export default useMassBookingAll;
