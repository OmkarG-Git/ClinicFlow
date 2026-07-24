import { AppointmentStatus, AppointmentType, UserRole } from "@/db/schema";

export interface PaginationOptions {
  page?: number;
  limit?: number;

  role?: UserRole;

  cursor?: string;

  search?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  page?: number;
  limit: number;

  total?: number;
  totalPages?: number;

  nextCursor?: string | null;
  previousCursor?: string | null;

  hasNext: boolean;
  hasPrevious: boolean;
}


export interface AppointmentOption extends PaginationOptions {

  status?: AppointmentStatus

  appointmentType?: AppointmentType
}