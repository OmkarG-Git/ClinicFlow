import type { UserRole } from "@/db/schema";

export interface Staff {
  id: string;

  firstName: string;

  gender: string | null

  lastName: string;

  email: string;

  role: UserRole;

  phone: string | null;

  avatarUrl: string | null;

  createdAt: Date | undefined

  isActive: boolean;
}

export interface staffState {

  totalStaff: number;
  totalDoctors: number
  totalReceptionists: number;
  activeStaff: number;
  inactiveStaff: number;
}