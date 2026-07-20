import { ReactNode } from "react";

import { Label } from "@/components/ui/label/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  error,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive">*</span>
        )}
      </Label>

      {children}

      {error && (
        <p
          className={cn(
            "text-sm font-medium text-destructive text-rose-500",
            "animate-in fade-in duration-200"
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}