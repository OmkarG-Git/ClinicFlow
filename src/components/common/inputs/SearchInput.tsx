"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string| undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}


export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm border rounded-full border-border">
      <Search className="absolute z-10 left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className={cn(
          "h-11 w-full rounded-full",
          "border border-slate-700/50",
          "pl-11 pr-10",
          "text-white placeholder:text-slate-400",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Focus states
          "focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0",
          "focus:bg-slate-800/50 focus:shadow-lg focus:shadow-blue-500/10",
          // Hover states
          "hover:border-slate-600 hover:bg-slate-800/40",
          // Blur states
          "backdrop-blur-sm",
          // Placeholder
          "placeholder:text-sm placeholder:text-slate-500/70 placeholder:font-light",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Selection
          "selection:bg-blue-500/20 selection:text-white",
          // Autofill
          "autofill:bg-slate-800/50 autofill:text-white",
          "-webkit-autofill:bg-slate-800/50 -webkit-autofill:text-white",
          // Focus visible for accessibility
          "focus-visible:outline-none"
        )}
      />

      {/* {value && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onChange("")}
          className="absolute right-1 top-1 h-9 w-9"
        >
          <X className="h-4 w-4" />
        </Button>
      )} */}
    </div>
  );
}