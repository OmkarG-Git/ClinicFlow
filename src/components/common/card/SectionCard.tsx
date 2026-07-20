"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  isLoading = false,
}: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}