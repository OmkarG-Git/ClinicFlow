import { RoleLayout } from "@/db/schema";
import { FinalLayout } from "@/types/layout";
import { Permission } from "@/types/permission";
import { create } from "zustand";

export type ClinicConfiguration = {
  settings: unknown | null | undefined;
  permissions: Permission[];
  permissionMap: Record<string, boolean>;
  layout: FinalLayout | null;
};

type Store = ClinicConfiguration & {
  setConfiguration: (
    data: ClinicConfiguration
  ) => void;

  clear: () => void;
};

export const useClinicConfigurationStore =
  create<Store>((set) => ({
    settings: null,

    permissions: [],

    permissionMap: {},

    layout: null,

    setConfiguration: (data) => {
      const permissionMap = Object.fromEntries(
        data.permissions.map((permission) => [
          `${permission.resource}:${permission.action}`,
          permission.allowed,
        ])
      );

      set({
        settings: data.settings,
        permissions: data.permissions,
        permissionMap,
        layout: data.layout,
      });
    },

    clear: () =>
      set({
        settings: null,
        permissions: [],
        layout: null,
      }),
  }));