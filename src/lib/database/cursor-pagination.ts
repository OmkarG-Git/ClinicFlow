import { PaginationMeta } from "@/types/pagination";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function getCursorPagination(
  limit?: number
) {
  const take = Math.min(
    Math.max(limit ?? DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );

  return {
    take,
  };
}

export function buildCursorPaginationMeta(
  limit: number,
  nextCursor: string | null,
  previousCursor: string | null = null
): PaginationMeta {

  return {

    limit,

    nextCursor,

    previousCursor,

    hasNext: nextCursor !== null,

    hasPrevious: previousCursor !== null,
  };
}