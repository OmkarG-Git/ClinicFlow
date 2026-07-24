"use server";

import { getStaff, getStaffStatsService } from "@/services/owner/staff.service";
import { errorResponse, successResponse } from "@/lib/response/service-response";
import { PaginationOptions } from "@/types/pagination";
import { requireAuth } from "@/lib/auth/require-auth";

import { UserRole } from "@/db/schema";

interface StaffFilters extends PaginationOptions {
  role?: UserRole;

  isActive?: boolean;
}

export async function getStaffAction(filters: StaffFilters, role: string) {

       try {
        const user = await requireAuth(role);

        const result = await getStaff(
            user.clinicId,
            filters
        );

        return successResponse(
            result
        );

    } catch (error) {
        if(error instanceof Error && error.message === "NEXT_REDIRECT") {
            return errorResponse(
                "Unauthorized"
            )
        }
        return errorResponse(
            "Faild to load patients, try refresh the page"
        )
    }

}

export async function getStaffStatsAction(role: string) {
    
    const user = await requireAuth(role);

    const result = await getStaffStatsService(
        user.clinicId
    );

    return successResponse(
        result
    );
}