// BarChart.tsx
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChartProps } from "../../hooks/dashboard/useDashboard";
import { ApexOptions } from "apexcharts";

interface BarChartProps {
  data: ChartProps[];
}

const BarChart: React.FC<BarChartProps> = ({ data }: BarChartProps) => {
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    const formattedData = data.map((item) => ({
      x: getMonthName(item._id),
      y: item.count,
    }));
    setChartData(formattedData);
  }, [data]);

  const getMonthName = (monthNumber: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: chartData.map((item) => item.x),
    },
  };

  return (
    <Chart
      options={options}
      series={[{ data: chartData.map((item) => item.y) }]}
      type="bar"
      height={350}
    />
  );
};

export default BarChart;
