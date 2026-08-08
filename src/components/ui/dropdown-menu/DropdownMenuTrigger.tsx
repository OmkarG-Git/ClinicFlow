"use client";

import { useDropdownMenu } from "./DropdownMenuContext";

export function DropdownMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } =
    useDropdownMenu();

  return (
    <div
      onClick={() => setOpen(!open)}
      className="inline-flex"
    >
      {children}
    </div>
  );
}