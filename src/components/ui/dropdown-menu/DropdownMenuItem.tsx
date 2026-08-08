"use client";

import { cn } from "@/lib/utils";
import { useDropdownMenu } from "./DropdownMenuContext";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
}: Props) {
  const { setOpen } =
    useDropdownMenu();

  return (
    <button
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2 text-sm transition hover:bg-muted",
        className
      )}
    >
      {children}
    </button>
  );
}