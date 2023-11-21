import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";

export interface ChartProps {
  _id: number;
  count: number;
}

interface Dashboard {
  usersToday: { count: number; stats: number };
  retreatBookingToday: {
    count: number;
    stats: number;
    cost: number;
    monthCost: number;
    totalYearCost: number;
    graph: ChartProps[];
  };
  massBookingToday: {
    count: number;
    stats: number;
    cost: number;
    monthCost: number;
    totalYearCost: number;
  };
  prayerRequestToday: { count: number; stats: number };
}
const apiClient = new APIClient<Dashboard, Dashboard>("/stats");

const useDashboard = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiClient.getStats(),
  });

export default useDashboard;
