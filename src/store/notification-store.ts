"use client";

import { create } from "zustand";
import { Notification, NotificationType } from "@/types/notification";

interface NotificationStore {
  notifications: Notification[];

  add: (
    type: NotificationType,
    message: string,
    title?: string
  ) => void;

  remove: (id: string) => void;

  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  add: (type, message, title) => {
    const id = crypto.randomUUID();

    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id,
          type,
          message,
          title,
        },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 5000);
  },

  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  success: (message, title) =>
    useNotificationStore.getState().add("success", message, title),

  error: (message, title) =>
    useNotificationStore.getState().add("error", message, title),

  warning: (message, title) =>
    useNotificationStore.getState().add("warning", message, title),

  info: (message, title) =>
    useNotificationStore.getState().add("info", message, title),
}));