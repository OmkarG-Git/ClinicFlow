import { db } from "@/db";
import { rolePermissions } from "@/db/schema";
import { type InferInsertModel } from "drizzle-orm";

import {
  ACTIONS,
  RESOURCES,
  DEFAULT_PERMISSIONS,
} from "@/constants/permissions";

type Executor = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function createDefaultPermissions(
    tx: Executor,
    clinicId: string
) {
  const rows: InferInsertModel<typeof rolePermissions>[] = [];

  const roles = ["DOCTOR", "RECEPTIONIST"] as const;

  for (const role of roles) {
    const config = DEFAULT_PERMISSIONS[role];

    for (const resourceKey of Object.keys(RESOURCES) as Array<keyof typeof RESOURCES>) {
      const resource = RESOURCES[resourceKey];
      const permissionsForResource = config.permissions as Record<string, readonly string[]>;

      for (const actionKey of Object.keys(ACTIONS) as Array<keyof typeof ACTIONS>) {
        const action = ACTIONS[actionKey];

        const allowed =
          config.all ||
          Boolean(permissionsForResource[resourceKey]?.includes(actionKey)) ||
          false;

        rows.push({
          clinicId,
          role,
          resource: resource as InferInsertModel<typeof rolePermissions>["resource"],
          action: action as InferInsertModel<typeof rolePermissions>["action"],
          allowed,
        });
      }
    }
  }

  return await tx.insert(rolePermissions).values(rows);
}