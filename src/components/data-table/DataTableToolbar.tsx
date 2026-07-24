import { ReactNode } from "react";
import { SearchInput } from "@/components/common/inputs/SearchInput";

interface DataTableToolbarProps {
  search?: string;
  onSearch?: (value: string) => void;

  searchPlaceholder?: string;

  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export function DataTableToolbar({
  search = "",
  onSearch,
  searchPlaceholder = "Search...",
  leftContent,
  rightContent,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-2 lg:flex-row lg:items-center border border-border rounded-2xl md:rounded-full lg:justify-between">
      <div className="flex flex-1 items-center gap-3">
        {onSearch && (
          <SearchInput
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
        )}

        {leftContent}
      </div>

      <div className="flex items-center gap-2">
        {rightContent}
      </div>
    </div>
  );
}