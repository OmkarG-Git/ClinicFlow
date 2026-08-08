"use client";

import { useMemo } from "react";
import type { RoleLayout } from "@/db/schema";
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store";
import { ownerNavigation } from "@/lib/navigation/owner";
import { doctorNavigation } from "@/lib/navigation/doctor-navigation";
import { receptionistNavigation } from "@/lib/navigation/receptionist-navigation";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { superAdminNavigation } from "@/lib/navigation/super-admin";

export function useSidebarNavigation() {
  const currentUser = useWorkspace();

  const rawLayout = useClinicConfigurationStore(
    (state) => state.layout
  ) as RoleLayout | { layout: RoleLayout } | null;

  const resolvedLayout =
    rawLayout && "layout" in rawLayout
      ? rawLayout.layout
      : rawLayout;

  return useMemo(() => {
    // Super admin does not use clinic layout
    if (currentUser.role === "SUPER_ADMIN") {
      return superAdminNavigation;
    }

    // Clinic users need clinic layout
    if (!resolvedLayout?.sidebar) {
      return [];
    }

    if (currentUser.role === "OWNER") {
      return ownerNavigation.filter((item) =>
        resolvedLayout.sidebar[
          item.id as keyof typeof resolvedLayout.sidebar
        ]?.enabled ?? false
      );
    }

    if (currentUser.role === "DOCTOR") {
      return doctorNavigation.filter((item) =>
        resolvedLayout.sidebar[
          item.id as keyof typeof resolvedLayout.sidebar
        ]?.enabled ?? false
      );
    }

    if (currentUser.role === "RECEPTIONIST") {
      return receptionistNavigation.filter((item) =>
        resolvedLayout.sidebar[
          item.id as keyof typeof resolvedLayout.sidebar
        ]?.enabled ?? false
      );
    }

    return [];
  }, [currentUser.role, resolvedLayout]);
}