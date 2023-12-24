import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../services/apiClient";
import useMassBookingQuery from "../../../store";
import ms from "ms";

interface PrayerRequestData {
  _id: string;
  fullName: string;
  email: string;
  message: string;
}
interface PrayerRequestBookingAll {
  results: PrayerRequestData[];
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

const apiClient = new APIClient<PrayerRequestBookingAll, null>(
  "/prayerRequest"
);

const usePrayerRequestAll = () => {
  const prayerRequestBooking = useMassBookingQuery((s) => s.prayerRequest);

  return useQuery<PrayerRequestBookingAll, Error>({
    queryKey: ["prayerRequest", prayerRequestBooking],

    queryFn: () =>
      apiClient.getAll1({
        params: {
          limit: prayerRequestBooking?.pageSize
            ? prayerRequestBooking?.pageSize
            : 10,
          searchDate: prayerRequestBooking?.searchDate,
          page: prayerRequestBooking.page,
        },
      }),

    staleTime: ms("24h"),
  });
};

// return useInfiniteQuery<PrayerRequestBookingAll, Error>({
//   queryKey: ["prayerRequest", prayerRequestBooking],

//   queryFn: ({ pageParam = 1 }) =>
//     apiClient.getAll1({
//       params: {
//         limit: prayerRequestBooking?.pageSize
//           ? prayerRequestBooking?.pageSize
//           : 3,
//         searchDate: prayerRequestBooking?.searchDate,
//         page: pageParam,
//       },
//     }),
//   getNextPageParam: (lastPage) => lastPage.next?.page ?? false,
//   getPreviousPageParam: (previousPage) =>
//     previousPage.previous?.page ?? false,
//   initialPageParam: 1,

//   staleTime: ms("24h"),
// });

export default usePrayerRequestAll;
