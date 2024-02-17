import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useRetreatBookingQuery from "../../../store";
import { RetreatBooking } from "../../retreatBookings/useYourBookings";
import ms from "ms";

interface RetreatBookingAll {
  results: RetreatBooking[];
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
          limit: retreatBookings?.pageSize ? retreatBookings?.pageSize : 10,
          searchDate: retreatBookings?.searchDate,
          page: retreatBookings.page,
        },
      }),

    staleTime: ms("24h"),
  });
};

export default useRetreatBookingAll;
