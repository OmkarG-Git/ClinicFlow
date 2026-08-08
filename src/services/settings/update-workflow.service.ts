// services/settings/update-workflow.service.ts

import {
  successResponse,
  errorResponse,
} from "@/lib/response/service-response";
import { WorkflowSettingsInput } from "@/lib/validations/settings.validation";
import { updateWorkflowSettings } from "@/repositories/settings/settings.repository";

export async function updateWorkflowService(
  clinicId: string,
  data: WorkflowSettingsInput
) {
  try {

    await updateWorkflowSettings(
      clinicId,
      data
    );

    return successResponse(
      null,
      "Workflow updated."
    );

  } catch (error) {

    return errorResponse(
      "Unable to update workflow."
    );

  }
}