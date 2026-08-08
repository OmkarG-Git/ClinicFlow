"use server";

import { requireAuth } from "@/lib/auth/require-auth";

import {
    workflowSettingsSchema,
} from "@/lib/validations/settings.validation";

import { updateWorkflowService }
from "@/services/settings/update-workflow.service";

import { getRolePermissionsService, updateRolePermissionService }
from "@/services/settings/get-role-permissions";

import { revalidatePath } from "next/cache";
import { Permission } from "@/types/permission";
import { successResponse } from "@/lib/response/service-response";

export async function updateWorkflowAction(
  values: unknown
) {

  const user =
    await requireAuth("OWNER");

  const validated =
    workflowSettingsSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  const response =
    await updateWorkflowService(
      user.clinicId!,
      validated.data
    );

  if (response.success) {
    revalidatePath("/owner/settings");
  }

  return response;
}



export async function getRolePermissionsAction(

    role: "DOCTOR" | "RECEPTIONIST"

) {

    const user =
        await requireAuth("OWNER");

    return await getRolePermissionsService(

        user.clinicId!,

        role

    );

}

export async function updateRolePermissionsAction(
  role: "DOCTOR" | "RECEPTIONIST",
  data: Permission[],
) {

  const user = await requireAuth("OWNER");

  const response = await updateRolePermissionService(
    role,
    data,
    user.clinicId
  );

  return successResponse(
    response
  );
}