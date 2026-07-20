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

const data = [
  { day: "Mon", visits: 18 },
  { day: "Tue", visits: 22 },
  { day: "Wed", visits: 15 },
  { day: "Thu", visits: 28 },
  { day: "Fri", visits: 31 },
  { day: "Sat", visits: 25 },
  { day: "Sun", visits: 12 },
];

const tooltipStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 12,
  padding: "8px 10px",
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 12px 30px -12px rgba(0, 0, 0, 0.6)",
};

export function AppointmentChart() {
  const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);
  const averageVisits = Math.round(totalVisits / data.length);
  const maxVisits = Math.max(...data.map(item => item.visits));
  const percentChange = Math.round(((maxVisits - averageVisits) / averageVisits) * 100);

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
              +{percentChange}%
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
            data={data} 
            margin={{ top: 10, right: 6, left: -20, bottom: 0 }}
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
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={11} 
            />
            
            <Tooltip 
              contentStyle={tooltipStyle} 
              cursor={{ fill: "rgba(255, 255, 255, 0.05)", opacity: 0.4 }} 
            />
            
            <Bar 
              dataKey="visits" 
              fill="url(#visitBar)" 
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
}