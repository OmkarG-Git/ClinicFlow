"use client";

import { Menu } from "lucide-react";

import { LayoutSwitch } from "./LayoutSwitch";
import { cn } from "@/lib/utils";
import { LAYOUT_DEPENDENCIES } from "@/constants/layout-dependency";
import { RoleLayout } from "@/db/schema";

type LayoutItem = {
  enabled: boolean;
  [key: string]: any;
};

type LayoutSection = Record<string, LayoutItem>;

type SidebarLayoutSection = Record<string, LayoutItem>

type Metadata = Record<
  string,
  {
    title: string;
    description: string;
  }
>;

interface Props {
  section?: "dashboard" | "quickActions";
  title: string;
  description: string;
  icon?: React.ReactNode;

  layout: LayoutSection;

  sidebarLayout: SidebarLayoutSection;

  metadata: Metadata;

  setLayout: (layout: LayoutSection) => void;

  isLoading?: boolean;
}

    export function isDependentDisabled(
    layout: SidebarLayoutSection,
    section: "dashboard" | "quickActions" | undefined,
    key: string
    ) {
        
    if(!section) return;
    for (const [sidebar, dependency] of Object.entries(LAYOUT_DEPENDENCIES)) {
        if (dependency[section]?.includes(key as never)) {
        return !layout[sidebar as keyof RoleLayout["sidebar"]].enabled;
        }
    }

    return false;
    }
export function SectionContainer({
  section,
  title,
  description,
  icon,
  layout,
  sidebarLayout,
  metadata,
  setLayout,
  isLoading = false,
}: Props) {
  function toggle(item: string) {
    setLayout({
      ...layout,
      [item]: {
        ...layout[item],
        enabled: !layout[item].enabled,
      },
    });
  }


  if (!layout) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
      </div>
    );
  }

  const entries = Object.entries(layout);

  const enabledCount = entries.filter(
    ([, value]) => value.enabled
  ).length;

  return (
    <div
      className={cn(
        "space-y-4 transition-opacity duration-300",
        isLoading
          ? "pointer-events-none opacity-50"
          : "opacity-100"
      )}
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
            {icon ?? <Menu className="h-5 w-5" />}
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <span className="rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground">
          {enabledCount} of {entries.length} enabled
        </span>
      </div>

      {/* Items */}

      <div className="divide-y divide-white/5 rounded-xl">
        {entries.map(([key, value]) => {
          const meta = metadata[key];

          return (
            <LayoutSwitch
              key={key}
              title={meta?.title ?? key}
              description={meta?.description ?? ""}
              checked={value.enabled}
               disabled={
                isLoading ||
                isDependentDisabled(
                    sidebarLayout,
                    section,
                    key
                )}
              onCheckedChange={() =>
                toggle(key)
              }
            />
          );
        })}
      </div>
    </div>
  );
}