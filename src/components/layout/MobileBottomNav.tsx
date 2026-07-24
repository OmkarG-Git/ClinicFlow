"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MoreHorizontal,
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
  CreditCard
} from "lucide-react";
import { Navigation } from "@/types/navigation";
import { cn } from "@/lib/utils";

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

interface MobileBottomNavProps {
  navigation: Navigation[];
  onMoreClick: () => void;
}

export function MobileBottomNav({
  navigation,
  onMoreClick,
}: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-background backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-1">
        {navigation.map((item) => {
          const Icon =
            ICONS[item.icon as keyof typeof ICONS] || LayoutDashboard;
          const isActive =
            item.href === pathname || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-200 min-w-[56px]",
                isActive
                  ? "text-emerald-400"
                  : "text-white/50 hover:text-white/80",
              )}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.title}</span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-8 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}

        {/* More Button */}
        <button
          onClick={onMoreClick}
          className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-200 min-w-[56px] text-white/50 hover:text-white/80"
        >
          <MoreHorizontal size={22} />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
}
