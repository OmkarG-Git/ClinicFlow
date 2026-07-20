import { PaginationMeta } from "./pagination";

export type ValidationErrors = Record<string, string[]>;

export interface ServiceResponse<T = null> {
  success: boolean;
  status: number;
  message: string;

  data?: T;

  pagination?: PaginationMeta;

  errors?: ValidationErrors;

  meta?: Record<string, unknown>;
}