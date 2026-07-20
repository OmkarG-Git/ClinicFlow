import {
  PaginationMeta,
  PaginationOptions,
} from "@/types/pagination";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function getOffsetPagination(
  options?: PaginationOptions
) {
  const page = Math.max(options?.page ?? DEFAULT_PAGE, 1);

  const limit = Math.min(
    Math.max(options?.limit ?? DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

export function buildOffsetPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {

  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,

    total,

    totalPages,

    hasNext: page < totalPages,

    hasPrevious: page > 1,
  };
}