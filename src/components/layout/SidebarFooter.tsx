"use client";

import {
  LogOut,
  Settings,
  HelpCircle,
  Shield,
  LifeBuoy,
} from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";

export function SidebarFooter() {
  const { collapsed } = useSidebar();

  return (
    <div className="border-t border-slate-800/60 px-3 py-3 flex-shrink-0 space-y-1">
      <button
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-[background-color,color,transform] duration-200 ease-out hover:bg-slate-800/50 hover:text-white group",
          collapsed && "justify-center px-2"
        )}
      >
        <LifeBuoy className="h-4 w-4 flex-shrink-0 transition-transform duration-200 ease-out group-hover:scale-110" />
        <span
          className={cn(
            "whitespace-nowrap transition-[width,opacity] duration-200 ease-out",
            collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
          )}
        >
          Help & Support
        </span>
      </button>

      <button
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-[background-color,color,transform] duration-200 ease-out hover:bg-slate-800/50 hover:text-white group",
          collapsed && "justify-center px-2"
        )}
      >
        <Settings className="h-4 w-4 flex-shrink-0 transition-transform duration-200 ease-out group-hover:rotate-90" />
        <span
          className={cn(
            "whitespace-nowrap transition-[width,opacity] duration-200 ease-out",
            collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
          )}
        >
          Settings
        </span>
      </button>

      <button
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-[background-color,color,transform] duration-200 ease-out hover:bg-red-500/10 hover:text-red-400 group",
          collapsed && "justify-center px-2"
        )}
      >
        <LogOut className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <span
          className={cn(
            "whitespace-nowrap transition-[width,opacity] duration-200 ease-out",
            collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
          )}
        >
          Logout
        </span>
      </button>

      <div
        className={cn(
          "mt-3 overflow-hidden rounded-xl bg-slate-800/30 px-3 py-2 transition-[height,opacity,padding] duration-200 ease-out",
          collapsed ? "h-0 opacity-0 p-0" : "h-auto opacity-100"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-slate-500" />
            <span className="text-[10px] font-medium text-slate-500">
              Secure
            </span>
          </div>
          <span className="text-[10px] text-slate-600">v2.0.0</span>
        </div>
      </div>
    </div>
  );
}