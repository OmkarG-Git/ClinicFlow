"use client";

import { Switch } from "@/components/ui/switch/switch";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Check, 
  X, 
  ChevronDown, 
  ChevronRight,
  Circle,
  CircleCheck,
  CircleOff
} from "lucide-react";
import { useState } from "react";
import { Permission } from "@/types/permission";

interface Props {
    resource: string;
    permissions: Permission[];
    allPermissions: Permission[];
    onChange: (p: Permission[]) => void;
}

const actionIcons: Record<string, string> = {
    create: "+",
    read: "👁",
    update: "✎",
    delete: "×",
    manage: "⚙",
    view: "👁",
    edit: "✎",
};

const actionColors: Record<string, string> = {
    create: "text-emerald-400",
    read: "text-blue-400",
    update: "text-purple-400",
    delete: "text-red-400",
    manage: "text-orange-400",
    view: "text-cyan-400",
    edit: "text-purple-400",
};

export function PermissionSection({
    resource,
    permissions,
    allPermissions,
    onChange,
}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const allowedCount = permissions.filter(p => p.allowed).length;
    const totalCount = permissions.length;
    const percentage = totalCount > 0 ? Math.round((allowedCount / totalCount) * 100) : 0;

    function toggle(id: string) {
        onChange(
            allPermissions.map(permission =>
                permission.id === id
                    ? {
                          ...permission,
                          allowed: !permission.allowed,
                      }
                    : permission
            )
        );
    }

    function toggleAll(enable: boolean) {
        onChange(
            allPermissions.map(permission =>
                permissions.some(p => p.id === permission.id)
                    ? {
                          ...permission,
                          allowed: enable,
                      }
                    : permission
            )
        );
    }

    const getActionIcon = (action: string) => {
        return actionIcons[action.toLowerCase()] || "•";
    };

    const getActionColor = (action: string) => {
        return actionColors[action.toLowerCase()] || "text-white/40";
    };

    return (
        <div className="group rounded-xl border border-white/5 bg-white/5 transition-all duration-200 hover:border-white/10 overflow-hidden">
            {/* Header */}
            <div 
                className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-white/5"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Shield className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-medium text-white capitalize">
                            {resource}
                        </h3>
                    </div>
                    
                    {/* Status badges */}
                    <div className="hidden sm:flex items-center gap-2">
                        <span className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                            percentage === 100 
                                ? "bg-emerald-500/10 text-emerald-400" 
                                : percentage === 0 
                                ? "bg-white/5 text-white/30" 
                                : "bg-emerald-500/5 text-emerald-400/70"
                        )}>
                            {percentage === 100 ? (
                                <CircleCheck className="h-3 w-3" />
                            ) : percentage === 0 ? (
                                <CircleOff className="h-3 w-3" />
                            ) : (
                                <Circle className="h-3 w-3" />
                            )}
                            {percentage}%
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Quick actions */}
                    <div className="flex items-center gap-0.5">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleAll(true);
                            }}
                            className="rounded-md p-1.5 text-white/20 transition-all hover:bg-emerald-500/10 hover:text-emerald-400"
                            title="Enable all"
                        >
                            <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleAll(false);
                            }}
                            className="rounded-md p-1.5 text-white/20 transition-all hover:bg-red-500/10 hover:text-red-400"
                            title="Disable all"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="w-px h-5 bg-white/5" />

                    <button
                        type="button"
                        className="rounded-md p-1 text-white/20 transition-all hover:bg-white/5 hover:text-white"
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Permissions Grid */}
            {isExpanded && (
                <div className="border-t border-white/5 px-4 py-3">
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {permissions.map((permission) => {
                            const isAllowed = permission.allowed;
                            const icon = getActionIcon(permission.action);
                            const color = getActionColor(permission.action);

                            return (
                                <div
                                    key={permission.id}
                                    className={cn(
                                        "group/item flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-150",
                                        isAllowed
                                            ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                                            : "bg-white/5 hover:bg-white/10"
                                    )}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className={cn(
                                            "text-sm font-medium",
                                            color
                                        )}>
                                            {icon}
                                        </span>
                                        <span className="truncate text-xs text-white/60 capitalize">
                                            {permission.action}
                                        </span>
                                    </div>

                                    <Switch
                                        checked={isAllowed}
                                        onCheckedChange={() => toggle(permission.id)}
                                        className={cn(
                                            "shrink-0 ml-2 h-4 w-8 transition-all",
                                            isAllowed 
                                                ? "common-bg" 
                                                : "bg-white/10"
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary bar */}
                    <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5">
                        <div className="flex items-center gap-3 text-xs text-white/30">
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {allowedCount} allowed
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                {totalCount - allowedCount} denied
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-16 rounded-full bg-white/5 overflow-hidden">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-white/20 font-mono">
                                {percentage}%
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}