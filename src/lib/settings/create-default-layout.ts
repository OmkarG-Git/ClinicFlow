import { RoleLayout, roleLayouts } from "@/db/schema";
import { DEFAULT_LAYOUTS } from "@/constants/permissions";
import { db } from "@/db";

type Executor = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function createDefaultLayout(
    tx: Executor,
    clinicId: string
) {
    
    await tx.insert(roleLayouts).values([
        {
            clinicId,
            role: "OWNER",
            layout: DEFAULT_LAYOUTS.OWNER,
        },
        {
            clinicId,
            role: "RECEPTIONIST",
            layout: DEFAULT_LAYOUTS.RECEPTIONIST,
        },
        {
            clinicId,
            role: "DOCTOR",
            layout: DEFAULT_LAYOUTS.DOCTOR,
        },
    ]);

    return {
        success: true
    }
}
