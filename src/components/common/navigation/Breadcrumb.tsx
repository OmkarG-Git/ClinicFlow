"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getBreadcrumbs } from "@/lib/navigation/get-breadcrumbs";

import { useLoadingStore } from "@/store/loading-store";

export function Breadcrumb() {
  const pathname = usePathname();

  const items = getBreadcrumbs(pathname);

  const start = useLoadingStore(
      (state) => state.start
    );
  

  if (items.length === 0) return null;

  return (
    <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.label}
            className="flex items-center gap-1"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
                onPointerDown={() => start()}
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        );
      })}
    </nav>
  );
}