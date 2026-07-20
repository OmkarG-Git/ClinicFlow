"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name: string;
  role: string;
  avatar?: string;
}

export function UserMenu({ name, role, avatar }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      >
        <div className="relative h-9 w-9 flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-lg shadow-blue-500/25">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-200/80 py-2">
            <div className="px-4 py-3 border-b border-slate-200/60">
              <p className="text-sm font-semibold text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">{role}</p>
            </div>

            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
              <User className="h-4 w-4 text-slate-400" />
              Profile
            </button>

            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
              <Settings className="h-4 w-4 text-slate-400" />
              Settings
            </button>

            <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Help Center
            </button>

            <div className="border-t border-slate-200/60 mt-1 pt-1">
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}