"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Widget } from "./Widget";
import { useTransition, useState } from "react";
import { getRevenueChartAction } from "@/actions/owner/revenue";

interface RevenueChartProps {

    summary: {
        totalRevenue: number;
        totalInvoices: number;
    } | undefined;

    chart: {
        label: string;
        revenue: number;
        invoices: number;
    }[] | undefined;

    className?: string;

}

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  padding: "8px 10px",
  fontSize: 12,
  color: "var(--color-popover-foreground)",
  boxShadow: "0 12px 30px -12px rgb(0 0 0 / 0.6)",
};

export function RevenueChart({
    summary: initialSummary,
    chart: initialChart,
    className,
}: RevenueChartProps) {
  // Calculate total and percentage change

  
  const [range, setRange] =
  useState<"TODAY" | "7D" | "30D" | "3M" | "1Y">("7D");

  const [isPending, startTransition] =
  useTransition();

  const [chart, setChart] = useState(initialChart);

  const [summary, setSummary] = useState(initialSummary);

  async function loadChart(
  selectedRange: "TODAY" | "7D" | "30D" | "3M" | "1Y"
  ) {
    setRange(selectedRange);

    startTransition(async () => {
      const response = await getRevenueChartAction(selectedRange);

      if (!response.success || !response.data) return;

      setSummary(response.data.summary);
      setChart(response.data.chart);
    });
  }

  const totalRevenue = summary?.totalRevenue || 0;
  const firstHalf = chart?.slice(0, 3).reduce((sum, item) => sum + item.revenue, 0) || 0;
  const secondHalf = chart?.slice(3).reduce((sum, item) => sum + item.revenue, 0) || 0;
  const percentChange = Math.round(((secondHalf - firstHalf) / firstHalf) * 100);

  return (
    <Widget 
      title="Revenue" 
      eyebrow="Monthly earnings" 
      size="lg"
      className={`${className}`}
      action={
        <div className="hidden items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 md:flex">
          {["1M","3M","6M","YTD","1Y"].map((r, i) => (
            <button 
              key={r} 
              onClick={() => loadChart(r as "TODAY" | "7D" | "30D" | "3M" | "1Y")}
              disabled={isPending}
              className={"rounded-md px-2 py-0.5 text-[11px] font-medium " + (i === 2 ? "bg-secondary text-foreground" : "text-muted-foreground")}
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-[28px] font-semibold tracking-tight">
            {/* ${summary.totalRevenue.toLocaleString()} */}
          </div>
          <div className="text-[12px] text-muted-foreground">
            <span className="mr-1.5 rounded-md bg-success/15 px-1.5 py-0.5 text-[10.5px] font-semibold text-success">
              +{percentChange}%
            </span>
            vs previous period
          </div>
        </div>
        <div className="hidden gap-4 md:flex">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> 
            Revenue
          </div>
        </div>
      </div>

      <div className="mt-4 h-[240px] w-full">
        <ResponsiveContainer>
          <AreaChart 
            data={chart} 
            margin={{ top: 10, right: 6, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={false} 
              stroke="var(--border)" 
              strokeDasharray="3 3" 
            />
            
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              stroke="var(--muted-foreground)" 
              fontSize={11} 
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              stroke="var(--muted-foreground)" 
              fontSize={11} 
            />
            
            <Tooltip 
              contentStyle={tooltipStyle} 
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }} 
            />
            
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              strokeWidth={2} 
              fill="url(#revenueGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
}