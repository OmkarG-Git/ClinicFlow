"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useLoadingStore } from "@/store/loading-store";

export function NavigationLoader() {
  const pathname = usePathname();

  const finish = useLoadingStore(
    (s) => s.finish
  );

  useEffect(() => {
    finish();
  }, [pathname, finish]);

  return null;
}