"use client";

import { ReactNode } from "react";

import { NotificationContainer } from "@/components/notifications";

interface Props {
  children: ReactNode;
}

export function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <NotificationContainer />
    </>
  );
}