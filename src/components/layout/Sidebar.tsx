"use client";

import { Navigation } from "@/types/navigation";
import { SidebarHeader } from "./SidebarHeader";
import { NavItem } from "./NavItem";
import { SidebarFooter } from "./SidebarFooter";
import { useSidebar } from "./SidebarProvider";
import { Building2, ChevronRight, ChevronLeft } from "lucide-react";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
} from "@/constants/layout";
import Image from "next/image";
import { CurrentUser } from "@/types/current-userType";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  title: string;
  navigation: Navigation[];
  user: CurrentUser;
}

export function Sidebar({ title, navigation, user }: SidebarProps) {
  const { collapsed, toggleSidebar } = useSidebar();
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        willChange: "width, transform",
      }}
      className={cn(
        "fixed left-0 top-0 h-full z-30 flex flex-col",
        "border-r border-slate-800/60 bg-sidebar/95 backdrop-blur-sm",
        "shadow-2xl shadow-black/30",
        "transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "overflow-hidden"
      )}
    >
      <div className="relative flex h-full flex-col">
        {/* Header */}
        <SidebarHeader title={title} />

        {/* Clinic Info */}
        <div
          className={cn(
            "flex items-center border-b border-slate-800/60",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            collapsed ? "justify-center px-2 py-3 gap-0" : "px-4 py-4 gap-3"
          )}
        >
          {/* Logo Container */}
          <div
            className={cn(
              "relative flex-shrink-0 overflow-hidden rounded-xl",
              "bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-purple-500/30",
              "ring-1 ring-white/10 shadow-lg",
              "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              collapsed 
                ? "h-10 w-10" 
                : "h-14 w-14 hover:scale-105 hover:shadow-xl hover:ring-white/20"
            )}
          >
            {user?.clinic?.logoUrl ? (
              <Image
                src={user?.clinic?.logoUrl}
                alt={user?.clinic?.name || "Clinic"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <Building2
                  className={cn(
                    "text-slate-400 transition-all duration-300",
                    collapsed ? "h-5 w-5" : "h-7 w-7"
                  )}
                />
              </div>
            )}
          </div>

          {/* Clinic Name - Animated */}
          <div
            className={cn(
              "flex-1 min-w-0 overflow-hidden",
              "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              collapsed 
                ? "max-w-0 opacity-0 scale-95" 
                : "max-w-full opacity-100 scale-100"
            )}
          >
            <p className="truncate text-sm font-semibold text-white">
              {user?.clinic?.name || "Clinic"}
            </p>
            <p className="truncate text-xs text-slate-400">
              {user?.clinic?.clinicType} Clinic
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 pr-4
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700/50 
          hover:scrollbar-thumb-slate-700 transition-colors">
          <div className="space-y-1.5">
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>
        </nav>

        {/* Toggle Button - Floating Design */}
        {/* Toggle Button - Minimal Tab */}
        <div
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-40",
            "transition-all duration-300"
          )}
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              "group relative flex h-12 w-3 items-center justify-center",
              "bg-slate-800/80 backdrop-blur-sm",
              "rounded-l-md rounded-r-none",
              "border-y border-l border-slate-700/50",
              "shadow-lg shadow-black/20",
              "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:bg-slate-700/80 hover:w-4",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
            )}
          >
            {collapsed ? (
              <ChevronRight
              className={cn(
                "h-3 w-3 text-slate-500",
                "transition-all duration-300",
                "group-hover:text-white",
              )}
            />
            ) : (
              <ChevronLeft
              className={cn(
                "h-3 w-3 text-slate-500",
                "transition-all duration-300",
                "group-hover:text-white",
              )}
            />
            )}
          </button>
        </div>

        <div className="border-t border-slate-800/60">
          <SidebarFooter />
        </div>
      </div>
    </aside>
  );
}