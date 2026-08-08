import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { permissionActionEnum, permissionResourceEnum, userRoleEnum } from "./enums";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

   role: userRoleEnum("role").notNull(),

    resource: permissionResourceEnum("resource")
    .notNull(),

    action: permissionActionEnum("action")
    .notNull(),

    allowed: boolean("allowed")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("role_unique")
    .on(
      table.clinicId,
      table.role,
      table.resource,
      table.action
    ),
  ]
);