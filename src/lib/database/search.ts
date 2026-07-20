import { ilike, or, type SQL } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export function buildSearch(
  search: string | undefined,
  columns: AnyPgColumn[]
): SQL | undefined {
  if (!search?.trim()) return undefined;

  return or(
    ...columns.map((column) =>
      ilike(column, `%${search.trim()}%`)
    )
  );
}