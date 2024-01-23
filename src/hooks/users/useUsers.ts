import APIClient from "../../services/apiClient";
import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import useUsersQuery from "../../store";

export interface UsersData {
  _id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  isEditor?: boolean;
  isIntercessionAdmin?: boolean;
  isBookingAdmin?: boolean;
  isYoutubeLinkAdmin?: boolean;
  verified: boolean;
  profilePic: string;
}

export interface UsersDataAll {
  results: UsersData[];
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

const apiClient = new APIClient<UsersDataAll, null>("/users");
const useUsers = () => {
  const usersData = useUsersQuery((s) => s.usersData);

  return useQuery({
    queryKey: ["users", usersData],
    queryFn: () =>
      apiClient.getAll1({
        params: {
          limit: usersData?.pageSize ? usersData?.pageSize : 10,
          searchDate: usersData?.searchDate,
          page: usersData.page,
          searchEmail: usersData.searchEmail,
        },
      }),
    staleTime: ms("24h"),
  });
};

export default useUsers;
