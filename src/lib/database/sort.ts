import { asc, desc } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export function buildSort(
  column: AnyPgColumn,
  order: "asc" | "desc" = "desc"
) {
  return order === "asc"
    ? asc(column)
    : desc(column);
}