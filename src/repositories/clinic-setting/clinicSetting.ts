import { eq } from "drizzle-orm";

import { db } from "@/db";
import { clinicSettings } from "@/db/schema";

export async function getClinicSettings(
  clinicId: string
) {
  return await db.query.clinicSettings.findFirst({
    where: eq(
      clinicSettings.clinicId,
      clinicId
    ),
  });
}