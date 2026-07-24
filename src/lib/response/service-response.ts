import {
  ServiceResponse,
} from "@/types/service-response";

import { PaginationMeta } from "@/types/pagination";

/* -------------------------------- Success -------------------------------- */

export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200
): ServiceResponse<T> {
  return {
    success: true,
    status,
    message,
    data,
  };
}

export function createdResponse<T>(
  data: T,
  message = "Created successfully"
): ServiceResponse<T> {
  return {
    success: true,
    status: 201,
    message,
    data,
  };
}

/* -------------------------------- Errors -------------------------------- */

export function errorResponse(
  message = "Something went wrong",
  status = 500,
  errors?: Record<string, string[]>
): ServiceResponse {
  return {
    success: false,
    status,
    message,
    errors,
  };
}

export function validationErrorResponse(
  errors: Record<string, string[]>,
  message = "Validation failed"
): ServiceResponse {
  return {
    success: false,
    status: 422,
    message,
    errors,
  };
}

export function unauthorizedResponse(
  message = "Unauthorized"
): ServiceResponse {
  return {
    success: false,
    status: 401,
    message,
  };
}

export function forbiddenResponse(
  message = "Forbidden"
): ServiceResponse {
  return {
    success: false,
    status: 403,
    message,
  };
}

export function notFoundResponse(
  message = "Resource not found"
): ServiceResponse {
  return {
    success: false,
    status: 404,
    message,
  };
}

export function conflictResponse(
  message = "Resource already exists"
): ServiceResponse {
  return {
    success: false,
    status: 409,
    message,
  };
}

/* ------------------------------ Pagination ------------------------------- */

export function paginatedResponse<T, S = undefined>(
  data: T,
  pagination: PaginationMeta,
  message: "Success",
  stats?: S,
): ServiceResponse<T, S> {
  return {
    success: true,
    status: 200,
    message,
    data,
    pagination,
    stats
  };
}