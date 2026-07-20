"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button/Button";
import { useNotificationStore } from "@/store/notification-store";
import { Notification } from "@/types/notification";

interface Props {
  notification: Notification;
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success:
    "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
  error:
    "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  warning:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  info:
    "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export function NotificationItem({ notification }: Props) {
  const remove = useNotificationStore((state) => state.remove);

  const Icon = icons[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-xl border shadow-xl backdrop-blur ${styles[notification.type]}`}
    >
      {/* Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-current/30"
      />

      <div className="flex items-start gap-4 p-4">
        <Icon className="mt-0.5 h-6 w-6 shrink-0" />

        <div className="flex-1">
          {notification.title && (
            <h4 className="font-semibold">{notification.title}</h4>
          )}

          <p className="text-sm">{notification.message}</p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => remove(notification.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}