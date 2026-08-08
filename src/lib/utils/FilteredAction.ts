import { Action, Resource } from "@/constants/permissions";
import { UserRole } from "@/db/schema";


export function can(
  role: UserRole,
  permissionMap: Record<string, boolean>,
  resource: Resource,
  action: Action
) {
  if (role === "OWNER") return true;

  return !!permissionMap[`${resource}:${action}`];
}