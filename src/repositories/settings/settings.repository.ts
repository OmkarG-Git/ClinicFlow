// repositories/settings/settings.repository.ts

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { clinicSettings } from "@/db/schema";
import { WorkflowSettingsInput } from "@/lib/validations/settings.validation";

export async function updateWorkflowSettings(
  clinicId: string,
  data: WorkflowSettingsInput
) {
  await db
    .update(clinicSettings)
    .set({
      workflowType: data.workflowType,

      autoGenerateToken:
        data.autoGenerateToken,

      autoAssignDoctor:
        data.autoAssignDoctor,

      requireServiceSelection:
        data.requireServiceSelection,

      updatedAt: new Date(),
    })
    .where(
      eq(
        clinicSettings.clinicId,
        clinicId
      )
    );
}