import { ReactNode } from "react";
import { PaginationMeta } from "@/types/pagination";

export interface DataTableColumn<T> {
  id: string;

  header: ReactNode;

  cell: (row: T) => ReactNode;

  width?: string;

  sortable?: boolean;

  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];

  data: T[];

  loading?: boolean;

  emptyMessage?: string;

  pagination?: PaginationMeta;

  onPageChange?: (page: number) => void;
}