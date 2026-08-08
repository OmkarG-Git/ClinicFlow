"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { useDropdownMenu } from "./DropdownMenuContext";

export function DropdownMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } =
    useDropdownMenu();

  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(
      e: MouseEvent
    ) {
      if (
        ref.current &&
        !ref.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 z-50 mt-2 w-52 rounded-xl border border-border bg-background p-1 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}