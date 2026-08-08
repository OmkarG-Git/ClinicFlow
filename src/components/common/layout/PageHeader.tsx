"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Breadcrumb } from "../navigation/Breadcrumb";

type breadcrumbType = {
  label: string,
  href: string,
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  action,
  children,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">

            <Breadcrumb />

          {badge && (
            <div className="mb-3 flex rounded-2xl w-15 p-4 text-muted common-bg">
              {badge}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="flex flex-wrap items-baseline gap-3">
            {action}
          </div>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-4">
          {children}
        </div>
      )}
    </motion.header>
  );
}