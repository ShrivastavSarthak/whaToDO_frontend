"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { userEnums } from "@/shared/utils/enums/user-enums";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChildBarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
export function ParentBarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}



export default function BarChartComponent() {
  const user = useAppSelector((state)=> state.user)

  return user.role === userEnums.PARENT ? <ParentBarChartComponent/> : <ChildBarChartComponent/>
}


