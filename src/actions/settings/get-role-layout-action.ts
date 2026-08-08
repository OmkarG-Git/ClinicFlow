"use server";

import { getSession } from "@/lib/auth/cookies";
import { db } from "@/db";
import { RoleLayout, roleLayouts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DEFAULT_LAYOUTS } from "@/constants/permissions";
import { requireAuth } from "@/lib/auth/require-auth";
import { syncRoleLayout } from "@/lib/settings/sync-role-layout";
import { Sidebar } from "@/components/layout/Sidebar";

export async function getRoleLayoutAction(
  role: "DOCTOR" | "RECEPTIONIST"
) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if(!session.clinicId) {
    throw new Error("clinic not found");
  }

  const row = await db.query.roleLayouts.findFirst({
    where: and(
      eq(roleLayouts.clinicId, session.clinicId),
      eq(roleLayouts.role, role)
    ),
  });

  const layoutData = row?.layout ?? DEFAULT_LAYOUTS[role];

  return {
    success: true,
    data: layoutData,
  };
}


export async function getRoleOptionLayoutAction(
  role: "DOCTOR" | "RECEPTIONIST",
  option: "dashboard" | "quickActions" | "sidebar"
) {
   const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if(!session.clinicId) {
    throw new Error("clinic not found");
  }

  const row = await db.query.roleLayouts.findFirst({
    where: and(
      eq(roleLayouts.clinicId, session.clinicId),
      eq(roleLayouts.role, role)
    ),
  });

  const layoutData = row?.layout?.[option] ?? DEFAULT_LAYOUTS[role][option];

  console.log("cheking data ", row?.layout[option], "and second", layoutData);

  return {
    success: true,
    data: {
      layout: layoutData,
      sidebar: row?.layout.sidebar ?? DEFAULT_LAYOUTS[role].sidebar,
    },
  };
}



export async function updateRoleLayoutAction(
  role: "DOCTOR" | "RECEPTIONIST",
  option: "sidebar" | "dashboard" | "quickActions",
  layout: RoleLayout[typeof option]
) {
  const user = await requireAuth("OWNER");

  if (!user?.clinicId) {
    return {
      success: false,
      message: "Clinic not found.",
    };
  }

  const existing = await db.query.roleLayouts.findFirst({
    where: and(
      eq(roleLayouts.clinicId, user.clinicId),
      eq(roleLayouts.role, role)
    ),
  });

  if (!existing) {
    return {
      success: false,
      message: "Role layout not found.",
    };
  }

  const updatedLayout: RoleLayout = {
    ...existing.layout,
    [option]: layout,
  };

  const syncedLayout = syncRoleLayout(updatedLayout);

  await db
    .update(roleLayouts)
    .set({
      layout: syncedLayout,
    })
    .where(
      and(
        eq(roleLayouts.clinicId, user.clinicId),
        eq(roleLayouts.role, role)
      )
    );

  revalidatePath("/owner/settings/role-layout");

  return {
    success: true,
    data: updatedLayout,
  };
}