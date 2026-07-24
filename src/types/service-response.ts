import { PaginationMeta } from "./pagination";

export type ValidationErrors = Record<string, string[]>;

export interface ServiceResponse<T = null, S = undefined> {
  success: boolean;
  status: number;
  message: string;

  data?: T;

  stats?: S;

  pagination?: PaginationMeta;

  errors?: ValidationErrors;

  meta?: Record<string, unknown>;
}