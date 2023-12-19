import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useRetreatBookingQuery from "../../../store";
import { YourBooking } from "../../retreatBookings/useYourBookings";
import ms from "ms";

interface RetreatBookingAll {
  result: YourBooking[];
  totalCount: number;
  events: string[];
}
const apiClient = new APIClient<RetreatBookingAll, null>(
  "/retreatBookings/all"
);

const useRetreatBookingAll = () => {
  const retreatBookings = useRetreatBookingQuery((s) => s.retreatBookings);

  return useQuery({
    queryKey: ["retreatBookingAll", retreatBookings],
    queryFn: () =>
      apiClient.getAll1({
        params: {
          pageSize: retreatBookings.pageSize,
          page: retreatBookings.page,
          startDate: retreatBookings.startDate,
          title: retreatBookings.title,
          searchQuery: retreatBookings.searchQuery,
          orderId: retreatBookings.orderId,
        },
      }),

    staleTime: ms("24h"),
  });
};

export default useRetreatBookingAll;
