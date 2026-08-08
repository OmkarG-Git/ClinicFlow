"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type Context = {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const DropdownMenuContext =
  createContext<Context | null>(null);

export function DropdownMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function useDropdownMenu() {
  const context = useContext(
    DropdownMenuContext
  );

  if (!context) {
    throw new Error(
      "DropdownMenu components must be inside DropdownMenu."
    );
  }

  return context;
}