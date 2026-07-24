import {
  pgTable,
  uuid,
  jsonb,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { userRoleEnum } from "./enums";
import { timeStamp } from "console";

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

    layout: jsonb("layout")
      .$type<{
        sidebar: string[];
        dashboardWidgets: string[];
        quickActions: string[];
      }>()
      .notNull(),

    ...timeStamp
  },
  (table) => ({
    uniqueRole: unique().on(
      table.clinicId,
      table.role
    ),
  })
);