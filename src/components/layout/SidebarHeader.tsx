"use client";

import { Logo } from "../branding/Logo";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  title: string;
}

export function SidebarHeader({ title }: SidebarHeaderProps) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center border-b border-slate-800/60 px-4 py-4 transition-[gap,justify-content,opacity] duration-200 ease-out",
        collapsed ? "justify-center" : "gap-3"
      )}
    >
      <Logo
        size={collapsed ? "lg" : "lg"}
        variant="light"
        className="flex-shrink-0"
        showText={collapsed ? false : true}
      />

      {/* {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 truncate">
            {title}
          </p>
        </div>
      )} */}
    </div>
  );
}