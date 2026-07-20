import { redirect } from "next/navigation";

import { hasPermission } from "./permissions";

export async function requirePermission(
  resource: string,
  action: string
) {
  const allowed = await hasPermission(resource, action);

  if (!allowed) {
    redirect("/unauthorized");
  }
}