import { PermissionRepository } from "@/repositories/settings/permission.repository";

import {
    successResponse,
    errorResponse,
} from "@/lib/response/service-response";
import { Permission } from "@/types/permission";

export async function getRolePermissionsService(

    clinicId: string,

    role: "DOCTOR" | "RECEPTIONIST"

) {

    try {

        const permissions =
            await PermissionRepository.getRolePermissions(
                clinicId,
                role
            );

        return successResponse(
            permissions,
            "Permissions loaded."
        );

    } catch {

        return errorResponse(
            "Failed to load permissions."
        );

    }

}

export async function updateRolePermissionService(
    role: "DOCTOR" | "RECEPTIONIST",
    data: Permission[],
    clinicId: string | null
) {

    return await PermissionRepository.updateMany(
        role,
        data,
        clinicId
    )
}