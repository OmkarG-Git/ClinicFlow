// RoleSelector.tsx
"use client";

import { UserCog, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: "DOCTOR" | "RECEPTIONIST";
  onChange: (role: "DOCTOR" | "RECEPTIONIST") => void;
  disabled?: boolean;
};

export function RoleSelector({
  value,
  onChange,
  disabled = false,
}: Props) {
  const roleOptions = [
    { value: "DOCTOR" as const, label: "Doctor", icon: UserCog },
    { value: "RECEPTIONIST" as const, label: "Receptionist", icon: Users },
  ];

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-white/70">
        <UserCog className="h-4 w-4 text-emerald-400" />
        Select Role
      </label>

      <div className="flex gap-2">
        {roleOptions.map((role) => {
          const isActive = value === role.value;
          const Icon = role.icon;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => !disabled && onChange(role.value)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                  : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:border-white/10"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-white" : "text-white/40"
              )} />
              {role.label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-white/30">
        Currently viewing layout for: <span className="text-emerald-400 font-medium">
          {value === "DOCTOR" ? "Doctor" : "Receptionist"}
        </span>
      </p>
    </div>
  );
}