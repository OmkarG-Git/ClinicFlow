"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";

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
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="h-11 rounded-xl pl-11 pr-10"
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