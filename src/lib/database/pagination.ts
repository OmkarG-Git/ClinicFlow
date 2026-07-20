import { PaginationMeta, PaginationOptions } from "@/types/pagination";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function getPagination(options?: PaginationOptions) {
  const page = Math.max(options?.page ?? DEFAULT_PAGE, 1);

  const limit = Math.min(
    Math.max(options?.limit ?? DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
    take: limit,
    cursor: options?.cursor ?? null,
  };
}

export function buildPaginationMeta({
  page,
  limit,
  total,
  nextCursor,
  previousCursor,
}: {
  page?: number;
  limit: number;
  total?: number;
  nextCursor?: string | null;
  previousCursor?: string | null;
}): PaginationMeta {
  const totalPages =
    total !== undefined
      ? Math.ceil(total / limit)
      : undefined;

  return {
    page,

    limit,

    total,

    totalPages,

    hasNext:
      nextCursor !== undefined
        ? nextCursor !== null
        : page !== undefined &&
          totalPages !== undefined &&
          page < totalPages,

    hasPrevious:
      previousCursor !== undefined
        ? previousCursor !== null
        : page !== undefined &&
          page > 1,

    nextCursor,

    previousCursor,
  };
}