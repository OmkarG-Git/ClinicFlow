"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | undefined;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: "blue" | "green" | "orange" | "red" | "purple";
  className?: string;
  isLoading?: boolean;
}

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-600",
    border: "hover:border-blue-200",
    glow: "hover:shadow-blue-500/10",
  },
  green: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-600",
    border: "hover:border-emerald-200",
    glow: "hover:shadow-emerald-500/10",
  },
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-600",
    border: "hover:border-orange-200",
    glow: "hover:shadow-orange-500/10",
  },
  red: {
    bg: "bg-rose-500/10",
    icon: "text-rose-600",
    border: "hover:border-rose-200",
    glow: "hover:shadow-rose-500/10",
  },
  purple: {
    bg: "bg-violet-500/10",
    icon: "text-violet-600",
    border: "hover:border-violet-200",
    glow: "hover:shadow-violet-500/10",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel = "vs last week",
  color = "blue",
  className,
  isLoading = false,
}: StatsCardProps) {
  const styles = colorMap[color];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="mt-3 h-10 w-32 bg-gray-200 rounded" />
        <div className="mt-6 h-6 w-20 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl",
        styles.glow,
        styles.border,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            <CountUp end={value || 0} duration={1.2} separator="," />
          </h2>
        </div>
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
            styles.bg
          )}
        >
          <Icon className={cn("h-7 w-7", styles.icon)} />
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-6 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              trend >= 0
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-rose-500/10 text-rose-600"
            )}
          >
            {trend >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {Math.abs(trend)}%
          </div>
          <span className="text-xs text-muted-foreground">{trendLabel}</span>
        </div>
      )}
    </motion.div>
  );
}