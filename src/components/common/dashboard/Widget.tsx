// components/common/Widget.tsx
import type { ReactNode } from "react";
import { GripVertical, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type WidgetSize = "sm" | "md" | "lg" | "xl";

const sizeToCol: Record<WidgetSize, string> = {
  sm: "col-span-12 sm:col-span-6 lg:col-span-3",
  md: "col-span-12 lg:col-span-6",
  lg: "col-span-12 lg:col-span-6 xl:col-span-8",
  xl: "col-span-12",
};

interface WidgetProps {
  title?: string;
  eyebrow?: string;
  size?: WidgetSize;
  action?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Widget({
  title,
  eyebrow,
  size = "md",
  action,
  icon,
  children,
  className,
  padded = true,
}: WidgetProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-white/20",
        sizeToCol[size],
        className,
      )}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 px-2 pt-2 pb-4">
          <div className="flex min-w-0 items-center gap-3">
            {icon && (
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-emerald-400">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {eyebrow && (
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                  {eyebrow}
                </div>
              )}
              {title && (
                <h3 className="truncate text-[15px] font-semibold text-white">
                  {title}
                </h3>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-white/40">
            {action}
            <button
              type="button"
              aria-label="Widget options"
              className="grid h-7 w-7 place-items-center rounded-md opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Drag widget"
              className="grid h-7 w-7 cursor-grab place-items-center rounded-md opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
            >
              <GripVertical className="h-4 w-4" />
            </button>
          </div>
        </header>
      )}
      <div className={cn(padded ? "px-2 pb-2" : "")}>{children}</div>
    </section>
  );
}