"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type StateItem = {
    label: string;
    value: number | undefined;
    icon?: LucideIcon;
    color?: string;
    bgColor?: string;
};

type MainStateProps = {
    states: StateItem[];
    loading: boolean;
}

export function MainState({
    states,
    loading
}: MainStateProps) {

    // Find max value for progress bar calculation
    const maxValue = Math.max(...states.map(s => s.value ?? 0));
    
    // Calculate total for percentage distribution
    const total = states.reduce((sum, s) => sum + (s.value ?? 0), 0);

    // Check if all values are 0 or undefined
    const hasData = states.some(s => (s.value ?? 0) > 0);

    // If no data and not loading, show nothing
    if (!loading && !hasData) {
        return null;
    }

    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 animate-pulse" />
                                <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
                            </div>
                            <div className="h-8 w-20 rounded bg-white/5 animate-pulse" />
                            <div className="h-1 w-full rounded bg-white/5 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {states.map((state, index) => {
                const value = state.value ?? 0;
                const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const Icon = state.icon;
                const color = state.color || "from-emerald-500 to-cyan-500";
                const bgColor = state.bgColor || "emerald-500/10";
                
                return (
                    <div 
                        key={index}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/5"
                    >
                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                            <div 
                                className={cn("h-full bg-gradient-to-r transition-all duration-1000 ease-out", color)}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header with Icon */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {Icon && (
                                        <div className={cn(
                                            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300",
                                            `bg-${bgColor}`,
                                            "group-hover:scale-110"
                                        )}>
                                            <Icon className={cn("h-5 w-5", color.replace("from-", "text-").split(" ")[0].replace("-500", "-400"))} />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-white/70">
                                        {state.label}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-white/30">
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>
                            
                            {/* Value */}
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-white tracking-tight">
                                    {value.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}