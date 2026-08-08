"use client";

import Link from "next/link";
import { memo } from "react";
import { Navigation } from "@/types/navigation";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  User,
  Stethoscope,
  ReceiptIndianRupeeIcon,
  Settings,
  Users,
  Clock,
  FileText,
  CreditCard,
} from "lucide-react";
import { useLoadingStore } from "@/store/loading-store";

import { useSidebar } from "./SidebarProvider";
import { cn } from "@/lib/utils";

interface NavigationItem {
  item: Navigation;
}

// Moved outside component so it's not recreated on every render
const ICONS = {
  dashboard: LayoutDashboard,
  building: Building2,
  calendar: Calendar,
  users: Users,
  user: User,
  stethoscope: Stethoscope,
  receipt: ReceiptIndianRupeeIcon,
  settings: Settings,
  clock: Clock,
  file: FileText,
  credit: CreditCard,
};

export const NavItem = memo(function NavItem({ item }: NavigationItem) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  const start = useLoadingStore(
    (state) => state.start
  );

  const isActive =
    item.href === pathname || pathname?.startsWith(item.href + "/");

  const Icon = ICONS[item.icon as keyof typeof ICONS] || LayoutDashboard;
  
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 font-semibold rounded-xl px-4 py-3 text-sm transition-[background-color,color,box-shadow,transform,padding] duration-200 ease-out",
        isActive
          ? "bg-muted text-muted-forground  shadow-lg "
          : "text-slate-400 hover:bg-slate-800/50 hover:text-white",
        collapsed ? "justify-center px-2" : "justify-start"
      )}
      onPointerDown={() => start()}
    >
      <span className={`shrink-0 flex ${isActive ? "text-primary" : ""}`}>
        <Icon size={20} />
      </span>

      {/* Always mounted — width/opacity animate instead of hard show/hide */}
      {!collapsed && (
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap transition-[width,opacity,margin] duration-200 ease-in-out",
            collapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 ml-0"
          )}
        >
          {item.title}
        </span>
      ) }
    </Link>
  );
});