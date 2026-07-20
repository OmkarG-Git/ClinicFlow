import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

export const clinicSettings = pgTable("clinic_settings", {
  id: uuid("id").defaultRandom().primaryKey(),

  clinicId: uuid("clinic_id")
    .notNull()
    .unique()
    .references(() => clinics.id, {
      onDelete: "cascade",
    }),

  appointmentEnabled: boolean("appointment_enabled")
    .default(true)
    .notNull(),

  walkInEnabled: boolean("walkin_enabled")
    .default(true)
    .notNull(),

  billingEnabled: boolean("billing_enabled")
    .default(true)
    .notNull(),

  inventoryEnabled: boolean("inventory_enabled")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});