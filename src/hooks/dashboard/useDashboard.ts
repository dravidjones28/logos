import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";

export interface ChartProps {
  _id: number;
  count: number;
}

interface Dashboard {
  usersToday: { count: number };
  retreatBookingToday: {
    count: number;
  };
  massBookingToday: {
    count: number;
  };
  prayerRequestToday: { count: number };
}
const apiClient = new APIClient<Dashboard, Dashboard>("/stats");

const useDashboard = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiClient.getStats(),
  });

export default useDashboard;
