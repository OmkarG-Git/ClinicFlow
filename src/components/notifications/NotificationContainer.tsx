"use client";

import { AnimatePresence } from "framer-motion";

import { useNotificationStore } from "@/store/notification-store";
import { NotificationItem } from "./NotificationItem";

export function NotificationContainer() {
  const notifications = useNotificationStore(
    (state) => state.notifications
  );

  return (
    <div className="fixed top-5 right-5 z-[9999] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}