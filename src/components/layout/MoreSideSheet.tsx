"use client";

import { useEffect } from "react";
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
  CreditCard,
  X
} from "lucide-react";import { Navigation } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "@/store/loading-store";

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

interface MoreSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Navigation[];
}

export function MoreSideSheet({ isOpen, onClose, navigation }: MoreSideSheetProps) {
  const pathname = usePathname();
  const start = useLoadingStore(
    (state) => state.start
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Side Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: -20 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-1/3 z-50 w-22 bg-background backdrop-blur-lg rounded-2xl shadow-2xl"
          >

            {/* Navigation Items */}
            <div className="overflow-y-auto flex flex-col items-center p-2 space-y-1 max-h-[calc(100vh-80px)]">
              {navigation.length === 0 ? (
                <p className="text-center text-white/40 py-8 text-sm">
                  No more options available
                </p>
              ) : (
                navigation.map((item) => {
                  const Icon = ICONS[item.icon as keyof typeof ICONS] || LayoutDashboard;
                  const isActive = item.href === pathname || pathname?.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-2 py-3 text-sm transition-all duration-200 overflow-hidden",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                      onPointerDown={() => start()}
                    >
                      <div className="flex flex-col items-center gap-1 overflow-hidden">
                        <Icon size={20} className="shrink-0" />
                        <span className="font-medium">{item.title}</span>
                        {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        )}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}