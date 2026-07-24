"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";

type FilterButton<T extends string> = {
  title: string;
  action: T;
};

type FilterBtnProps<T extends string = string> = {
  className?: string;
  buttons: ReadonlyArray<FilterButton<T>>;
  onFilterChange: (action: T) => void;
  defaultActive?: T;
  variant?: "pill" | "underline" | "outline";
  size?: "sm" | "md" | "lg";
};

export function FilterBtns<T extends string = string>({
  className = "",
  buttons,
  onFilterChange,
  defaultActive,
  variant = "pill",
  size = "md",
}: FilterBtnProps<T>) {
  const [activeFilter, setActiveFilter] = useState<T | null>(defaultActive || null);

  const handleFilterClick = (action: T) => {
    const newActive = activeFilter === action ? null : action;
    setActiveFilter(newActive);
    onFilterChange(newActive as T);
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  };

  const variantClasses = {
    pill: "rounded-full border transition-all duration-200",
    underline: "border-b-2 rounded-none transition-all duration-200",
    outline: "rounded-lg border-2 transition-all duration-200",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {buttons.map((btn, index) => {
        const isActive = activeFilter === btn.action;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleFilterClick(btn.action)}
            className={cn(
              variantClasses[variant],
              sizeClasses[size],
              "font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900",
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 border-transparent"
                : "border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5"
            )}
          >
            {btn.title}
          </button>
        );
      })}
    </div>
  );
}