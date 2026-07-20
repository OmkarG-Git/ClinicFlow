import { PaginationOptions } from "./pagination";

export interface QueryOptions
  extends PaginationOptions {
  clinicId: string;
}