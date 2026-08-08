import { and, eq } from "drizzle-orm";

import { db } from "@/db";

import {
  roleLayouts,
  rolePermissions,
} from "@/db/schema";
import { Permission } from "@/types/permission";

const SIDEBAR_RESOURCE_MAP = {
  dashboard: null,
  patients: "PATIENTS",
  visits: "VISITS",
  appointments: "APPOINTMENTS",
  doctors: "DOCTORS",
  receptionists: "RECEPTIONISTS",
  services: null,
  billing: "BILLING",
  inventory: "INVENTORY",
  reports: "REPORTS",
  settings: null,
} as const;

export class PermissionRepository {
  static async getRolePermissions(
    clinicId: string,
    role: "DOCTOR" | "RECEPTIONIST"
  ) {
    const permissions = await db.query.rolePermissions.findMany({
      where: and(
        eq(rolePermissions.clinicId, clinicId),
        eq(rolePermissions.role, role)
      ),

      orderBy: (permission, { asc }) => [
        asc(permission.resource),
        asc(permission.action),
      ],
    });

    const row = await db.query.roleLayouts.findFirst({
      where: and(
        eq(roleLayouts.clinicId, clinicId),
        eq(roleLayouts.role, role)
      ),
    });

    if (!row) {
      return [];
    }

    const sidebar = row.layout.sidebar;

    const enabledResources = new Set<Permission["resource"]>(
      Object.entries(sidebar)
        .filter(([, value]) => value.enabled)
        .map(([key]) => {
          return SIDEBAR_RESOURCE_MAP[
            key as keyof typeof SIDEBAR_RESOURCE_MAP
          ];
        })
        .filter(
          (
            value
          ): value is NonNullable<typeof value> =>
            value !== null
        )
    );

    return permissions.filter((permission) =>
      enabledResources.has(permission.resource)
    );
  }

  static async updateMany(
    role: "DOCTOR" | "RECEPTIONIST",
    data: Permission[],
    clinicId: string | null
  ) {

    if(!clinicId) {
      throw new Error("Clinic not found");
    }

    return await db.transaction(async (tx) => {
      for (const permission of data) {
        await tx
          .update(rolePermissions)
          .set({
            allowed: permission.allowed,
            // updatedAt: new Date(),
          })
          .where(
            and(
              eq(rolePermissions.clinicId, clinicId),
              eq(rolePermissions.role, role),
              eq(rolePermissions.resource, permission.resource),
              eq(rolePermissions.action, permission.action)
            )
          );
      }

      return {
        success: true,
      };
    });
  }
}