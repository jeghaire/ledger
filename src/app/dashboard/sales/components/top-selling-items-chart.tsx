// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function TopSellingItemsChart({
  data,
}: {
  data: { item_name: string; total_quantity_sold: number }[];
}) {
  return (
    // <BarChart width={500} height={300} data={data}>
    //   <XAxis dataKey="item_name" />
    //   <YAxis />
    //   <Tooltip />
    //   <Bar dataKey="total_quantity_sold" fill="#8884d8" />
    // </BarChart>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
