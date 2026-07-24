import { Staff } from "@/repositories/staff/staff";
import { PaginationOptions } from "@/types/pagination";

export async function getStaff(
    clinicId: string | null,
    options: PaginationOptions,
) {
    return Staff.findMany(
        clinicId,
        options,
    )
}

export async function getStaffStatsService(
    clinicId: string | null
) {
    return Staff.getStaffStats(
        clinicId
    );
}