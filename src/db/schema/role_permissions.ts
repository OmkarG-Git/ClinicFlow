import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    role: varchar("role", {
      length: 30,
    }).notNull(),

    resource: varchar("resource", {
      length: 50,
    }).notNull(),

    action: varchar("action", {
      length: 50,
    }).notNull(),

    allowed: boolean("allowed")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniquePermission: unique().on(
      table.clinicId,
      table.role,
      table.resource,
      table.action
    ),
  })
);