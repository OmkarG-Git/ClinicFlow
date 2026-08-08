// components/settings/SettingsCard.tsx

import { Card, CardContent } from "@/components/ui/card/Card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SettingsCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SettingsCard({
  title,
  description,
  icon,
  className,
}: SettingsCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden border border-border backdrop-blur transition-all duration-300",
      className
    )}>
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {icon && (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all group-hover:scale-110">
              {icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white">
              {title}
            </h3>
            <p className="mt-0.5 text-sm text-white/50 truncate">
              {description}
            </p>
          </div>
        </div>

        <ChevronRight className="ml-3 h-5 w-5 shrink-0 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-1" />
      </CardContent>
    </Card>
  );
}