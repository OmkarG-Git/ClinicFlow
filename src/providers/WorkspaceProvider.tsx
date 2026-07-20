"use client";

import { createContext, useContext } from "react";

import { CurrentUser } from "@/types/current-userType";

const WorkspaceContext = createContext<CurrentUser | null>(null);

export function WorkspaceProvider({
  currentUser,
  children,
}: {
  currentUser: CurrentUser;
  children: React.ReactNode;
}) {
  return (
    <WorkspaceContext.Provider value={currentUser}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}