import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { rolePermissions } from "@/db/schema";

import { getSession } from "@/lib/auth/cookies";

export async function hasPermission(
  resource: string,
  action: string
) {
  const session = await getSession();

  if (!session) {
    return false;
  }

  // Super Admin bypass
  if (session.role === "SUPER_ADMIN") {
    return true;
  }

  const permission = await db.query.rolePermissions.findFirst({
    where: and(
      eq(rolePermissions.clinicId, session.clinicId!),
      eq(rolePermissions.role, session.role),
      eq(rolePermissions.resource, resource),
      eq(rolePermissions.action, action)
    ),
    columns: {
      allowed: true,
    },
  });

  return permission?.allowed ?? false;
}