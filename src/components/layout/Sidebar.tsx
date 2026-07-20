"use client";

import { Navigation } from "@/types/navigation";
import { SidebarHeader } from "./SidebarHeader";
import { NavItem } from "./NavItem";
import { SidebarFooter } from "./SidebarFooter";
import { useSidebar } from "./SidebarProvider";
import { Building2, ChevronDown, ChevronRight } from "lucide-react";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
} from "@/constants/layout";

import Image from "next/image";
import { CurrentUser } from "@/types/current-userType";
import { cn } from "@/lib/utils";

interface SidebarProps {
  title: string;
  navigation: Navigation[];
  user: CurrentUser;
}

export function Sidebar({ title, navigation, user }: SidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <aside
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        willChange: "width",
      }}
      className="fixed left-0 top-0 h-full z-30  flex flex-col overflow-hidden border-r border-slate-800/60 bg-sidebar shadow-2xl shadow-black/20 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <SidebarHeader title={title} />

      {/* Clinic Info */}
      <div
        className={cn(
          "flex items-center border-b border-slate-800/60 px-4 py-4 transition-all duration-300",
          collapsed ? "justify-center gap-0" : "gap-3"
        )}
      >
        <div
          className={cn(
            "relative flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20",
            collapsed ? "h-10 w-10" : "h-14 w-14"
          )}
        >
          {user?.clinic?.logoUrl ? (
            <Image
              src={user?.clinic?.logoUrl}
              alt={user?.clinic?.name || "Clinic"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Building2
                className={cn(
                  "text-slate-400",
                  collapsed ? "h-5 w-5" : "h-7 w-7"
                )}
              />
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.clinic?.name || "Clinic"}
            </p>
            <p className="truncate text-xs text-slate-400">
              {user?.clinic?.clinicType } Clinic
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-slate-700">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      <SidebarFooter />
    </aside>
  );
}