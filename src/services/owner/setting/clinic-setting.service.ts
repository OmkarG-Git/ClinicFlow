import {
  successResponse,
  errorResponse,
} from "@/lib/response/service-response";

import { getClinicSettings } from "@/repositories/clinic-setting/clinicSetting";

export async function getClinicSettingsService(
  clinicId: string
) {
  try {
    if (!clinicId) {
      return errorResponse("Clinic not found", 404);
    }

    const settings =
      await getClinicSettings(clinicId);

    if (!settings) {
      return errorResponse(
        "Settings not found",
        404
      );
    }

    return successResponse(
      settings,
      "Settings loaded"
    );

  } catch (error) {
    console.error(error);

    return errorResponse(
      "Failed to load settings",
      500
    );
  }
}