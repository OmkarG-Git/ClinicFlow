"use server";

import { getStaff } from "@/services/owner/staff.service";
import { errorResponse } from "@/lib/response/service-response";
import { PaginationOptions } from "@/types/pagination";
import { requireAuth } from "@/lib/auth/require-auth";

import { UserRole } from "@/db/schema";

interface StaffFilters extends PaginationOptions {
  role?: UserRole;

  isActive?: boolean;
}

export async function getStaffAction(filters: StaffFilters) {

       try {
        const user = await requireAuth();

        return await getStaff(
            user.clinicId,
            filters
        );

    } catch (error) {
        console.error(error);

        return errorResponse(
            "Failed to fetch staff."
        );
    }

}