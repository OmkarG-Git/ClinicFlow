// LayoutSwitch.tsx
"use client";

import { Switch } from "@/components/ui/switch/switch";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function LayoutSwitch({
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
}: Props) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between py-3 transition-all duration-200",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-sm font-medium text-white/80 capitalize transition-colors group-hover:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-white/30">{description}</p>
        )}
      </div>

      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={cn(
          "shrink-0 transition-all",
          checked 
            ? "common-bg" 
            : "bg-white/10"
        )}
      />
    </div>
  );
}