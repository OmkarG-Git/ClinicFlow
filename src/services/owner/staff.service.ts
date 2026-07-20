import { UserRepository } from "@/repositories/user.repository";
import { PaginationOptions } from "@/types/pagination";

export async function getStaff(
    clinicId: string | null,
    options: PaginationOptions,
) {
    return UserRepository.findMany(
        clinicId,
        options,
    )
}