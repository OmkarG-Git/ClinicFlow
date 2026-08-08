import {
  jsonb,
  pgTable,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { userRoleEnum } from "./enums";
import { timestamps } from "./common";

export const roleLayouts = pgTable(
  "role_layouts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    role: userRoleEnum("role").notNull(),

    layout: jsonb("layout").$type<RoleLayout>().notNull(),

    ...timestamps,
  },
  (table) => [
    uniqueIndex("role_layouts_unique").on(
      table.clinicId,
      table.role
    ),
  ]
);

export type RoleLayout = {
  sidebar: {
    dashboard: {
      enabled: boolean;
    };

    patients: {
      enabled: boolean;
    };

    visits: {
      enabled: boolean;
    };

    appointments: {
      enabled: boolean;
    };

    doctors: {
      enabled: boolean;
    };

    receptionists: {
      enabled: boolean;
    };

    services: {
      enabled: boolean;
    };

    billing: {
      enabled: boolean;
    };

    inventory: {
      enabled: boolean;
    };

    reports: {
      enabled: boolean;
    };

    settings: {
      enabled: boolean;
    };
  };

  dashboard: {
    revenueChart: {
      enabled: boolean;
      defaultRange: "7D" | "30D" | "3M" | "1Y";
    };

    weeklyVisitsChart: {
      enabled: boolean;
      defaultRange: "7D" | "30D";
    };

    todayVisits: {
      enabled: boolean;
    };

    upcomingAppointments: {
      enabled: boolean;
    };

    pendingBills: {
      enabled: boolean;
    };

    inventoryAlerts: {
      enabled: boolean;
    };

    doctorPerformance: {
      enabled: boolean;
    };

    patientGrowth: {
      enabled: boolean;
    };

    topServices: {
      enabled: boolean;
    };

    calendar: {
      enabled: boolean;
    };

    recentActivity: {
      enabled: boolean;

      limit: number;

      showPatients: boolean;

      showAppointments: boolean;

      showBilling: boolean;

      showInventory: boolean;
    };

    quickActions: {
      enabled: boolean;
    };
  };

  quickActions: {
    createPatient: {
      enabled: boolean;
    };

    createVisit: {
      enabled: boolean;
    };

    createAppointment: {
      enabled: boolean;
    };

    createBill: {
      enabled: boolean;
    };

    createDoctor: {
      enabled: boolean;
    };

    addService: {
      enabled: boolean;
    };
  };
};