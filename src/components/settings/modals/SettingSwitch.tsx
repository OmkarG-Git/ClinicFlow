"use client";

import { Switch } from "@/components/ui/switch/switch";

interface SettingSwitchProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingSwitch({
  title,
  checked,
  onChange,
}: SettingSwitchProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">

      <div>
        <h4 className="font-medium">
          {title}
        </h4>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />

    </div>
  );
}