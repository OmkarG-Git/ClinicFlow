"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Widget } from "./Widget";
import { FormatDate } from "@/lib/DateFormater/FormatDate";

const tooltipStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 12,
  padding: "8px 10px",
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 12px 30px -12px rgba(0, 0, 0, 0.6)",
};

type AppointmentChartProps = {
  data: {
    date: string;
    appointments: number;
  }[] | undefined;
  loading?: boolean;
};

export function AppointmentChart({
  data,
  loading = false
}: AppointmentChartProps) {
  
  // Handle loading state
  if (loading) {
    return (
      <Widget 
        title="Weekly Visits" 
        eyebrow="Patient visits this week" 
        size="md"
        className="!col-span-12 xl:!col-span-4"
      >
        <div className="flex items-end justify-between">
          <div>
            <div className="h-8 w-16 rounded bg-white/5 animate-pulse" />
            <div className="mt-2 h-4 w-32 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-4 w-16 rounded bg-white/5 animate-pulse" />
        </div>
        <div className="mt-4 h-[240px] w-full rounded bg-white/5 animate-pulse" />
      </Widget>
    );
  }

  // Handle no data state
  if (!data || data.length === 0) {
    return (
      <Widget 
        title="Weekly Visits" 
        eyebrow="Patient visits this week" 
        size="md"
        className="!col-span-12 xl:!col-span-4"
      >
        <div className="flex h-[280px] flex-col items-center justify-center text-white/40">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-sm">No appointment data available</p>
        </div>
      </Widget>
    );
  }

  // Transform data for chart
  const chartData = data.map(item => ({
    day: FormatDate.weekday(item.date),
    visits: item.appointments,
    fullDate: item.date,
  }));

  // Calculate statistics
  const totalVisits = chartData.reduce((sum, item) => sum + item.visits, 0);
  const averageVisits = Math.round(totalVisits / chartData.length);
  const maxVisits = Math.max(...chartData.map(item => item.visits));
  const minVisits = Math.min(...chartData.map(item => item.visits));
  
  // Calculate percentage change from average
  const percentChange = averageVisits > 0 
    ? Math.round(((maxVisits - averageVisits) / averageVisits) * 100)
    : 0;

  // Find day with max visits
  const maxDay = chartData.find(item => item.visits === maxVisits)?.day || '';

  // Calculate dynamic bar size based on data length
  const barSize = Math.min(60, Math.max(30, 80 / chartData.length));

  return (
    <Widget 
      title="Weekly Visits" 
      eyebrow="Patient visits this week" 
      size="md"
      className="!col-span-12 xl:!col-span-4"
    >
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[28px] font-semibold tracking-tight text-white">
            {totalVisits}
          </div>
          <div className="text-[12px] text-white/50">
            <span className="mr-1.5 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10.5px] font-semibold text-emerald-400">
              {percentChange > 0 ? '+' : ''}{percentChange}%
            </span>
            avg {averageVisits} per day
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-white/50">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> 
          Visits
        </div>
      </div>
      
      <div className="mt-4 h-[240px] w-full">
        <ResponsiveContainer>
          <BarChart 
            data={chartData} 
            margin={{ top: 10, right: 6, left: -20, bottom: 0 }}
            barCategoryGap="20%"
            barGap={4}
          >
            <defs>
              <linearGradient id="visitBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={false} 
              stroke="rgba(255, 255, 255, 0.05)" 
              strokeDasharray="3 3" 
            />
            
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false} 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={11} 
              interval={0}
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={11} 
              allowDecimals={false}
            />
            
            <Tooltip 
              contentStyle={tooltipStyle}
              labelFormatter={(label) => `${label}`}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)", opacity: 0.4 }} 
            />
            
            <Bar 
              dataKey="visits" 
              fill="url(#visitBar)" 
              radius={[6, 6, 0, 0]} 
              barSize={barSize}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional stats */}
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/30">
        <div>
          <span className="font-medium text-white/50">Peak day:</span> {maxDay} ({maxVisits} visits)
        </div>
        <div>
          <span className="font-medium text-white/50">Lowest:</span> {minVisits} visits
        </div>
      </div>
    </Widget>
  );
}