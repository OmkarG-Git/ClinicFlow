"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet/Sheet";

import { Button } from "@/components/ui/button/Button";

interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children: ReactNode;

  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
}

const widths = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
};

export function AppDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "lg",
}: AppDrawerProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        className={`flex h-full flex-col p-0 ${widths[size]}`}
      >
        <SheetHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl">
                {title}
              </SheetTitle>

              {description && (
                <SheetDescription className="mt-1">
                  {description}
                </SheetDescription>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>

        {footer && (
          <div className="border-t bg-background px-6 py-4">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}