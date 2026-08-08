"use server";

import { db } from "@/db";
import {
  clinicSettings,
  roleLayouts,
  userLayouts,
  rolePermissions,
  UserRole,
} from "@/db/schema";

import { and, eq } from "drizzle-orm";
import { mergeLayout } from "@/lib/settings/merge-layout";

type Input = {
  clinicId: string | null;
  userId: string;
  role: UserRole;
};
import type { ClinicConfiguration } from "@/store/clinic-configuration-store";

const emptyConfiguration: ClinicConfiguration = {
  settings: null,
  permissions: [],
  layout: null,
  permissionMap: {}
};

type SuccessResult = {
  success: true;
  status: 200;
  message: "Configuration loaded";
  data: ClinicConfiguration;
};

type FailureResult = {
  success: false;
  status: 500;
  message: "Failed to load configuration";
  data: null;
};

export type ClinicConfigurationActionResult = SuccessResult | FailureResult;

export async function getClinicConfigurationAction({
  clinicId,
  userId,
  role,
}: Input): Promise<ClinicConfigurationActionResult> {
  try {
    if (!clinicId || role === "SUPER_ADMIN") {
      return {
        success: true,
        status: 200,
        message: "Configuration loaded",
        data: emptyConfiguration,
      };
    }

    const [settings, permissions, roleLayout, userLayout] = await Promise.all([
      db.query.clinicSettings.findFirst({
        where: eq(clinicSettings.clinicId, clinicId),
      }),
      db.query.rolePermissions.findMany({
        where: and(
          eq(rolePermissions.clinicId, clinicId),
          eq(rolePermissions.role, role),
        ),
      }),
      db.query.roleLayouts.findFirst({
        where: and(
          eq(roleLayouts.clinicId, clinicId),
          eq(roleLayouts.role, role),
        ),
      }),
      db.query.userLayouts.findFirst({
        where: and(
          eq(userLayouts.clinicId, clinicId),
          eq(userLayouts.userId, userId),
        ),
      }),
    ]);

    console.log("comming from db", roleLayout, "and", " user", userLayout);

    const layout = mergeLayout(roleLayout, userLayout);

    console.log("and final layout", layout);

    return {
      success: true,
      status: 200,
      message: "Configuration loaded",
      data: {
        settings,
        permissions,
        layout: layout ?? null,
        permissionMap: {},
      },
    };
  } catch {
    return {
      success: false,
      status: 500,
      message: "Failed to load configuration",
      data: null,
    };
  }
}


