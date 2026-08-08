"use client";

import { DropdownMenuProvider } from "./DropdownMenuContext";

export function DropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DropdownMenuProvider>
      {children}
    </DropdownMenuProvider>
  );
}