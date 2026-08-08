"use client";

import React from "react";
import Link from "next/link";

import {
  navigation,
  type NavigationKey,
  generatePath,
} from "@/constants/navigations";

import { useLoadingStore } from "@/store/loading-store";

interface NavigatorProps {
  id: NavigationKey;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}

export default function Navigator({
  id,
  params = {},
  children,
  className,
}: NavigatorProps) {
  const start = useLoadingStore(
    (state) => state.start
  );

  const navItem = navigation[id];

  if (!navItem) {
    console.warn(
      `Navigation item "${id}" not found`
    );

    return <>{children}</>;
  }

  const href = generatePath(
    navItem.href,
    params
  );

  return (
    <Link
      href={href}
      className={className}
      onPointerDown={() => start()}
    >
      {children}
    </Link>
  );
}