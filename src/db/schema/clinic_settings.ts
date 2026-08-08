import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { workflowTypeEnum } from "./enums";

export const clinicSettings = pgTable("clinic_settings", {
  id: uuid("id").defaultRandom().primaryKey(),

  clinicId: uuid("clinic_id")
    .notNull()
    .unique()
    .references(() => clinics.id, {
      onDelete: "cascade",
    }),

  workflowType: workflowTypeEnum("workflow_type")
    .default("HYBRID")
    .notNull(),

  billingEnabled: boolean("billing_enabled")
    .default(true)
    .notNull(),

  inventoryEnabled: boolean("inventory_enabled")
    .default(false)
    .notNull(),

  // Workflow
  autoGenerateToken: boolean("auto_generate_token")
    .default(true)
    .notNull(),

  autoAssignDoctor: boolean("auto_assign_doctor")
    .default(false)
    .notNull(),

  requireServiceSelection: boolean("require_service_selection")
    .default(true)
    .notNull(),

  // Appointment
  appointmentDuration: integer("appointment_duration")
    .default(30)
    .notNull(),

  appointmentBuffer: integer("appointment_buffer")
    .default(5)
    .notNull(),

  // Billing
  currency: varchar("currency", { length: 10 })
    .default("INR")
    .notNull(),

  invoicePrefix: varchar("invoice_prefix", {
    length: 10,
  }).default("INV"),

  tokenPrefix: varchar("token_prefix", {
    length: 10,
  }).default("T"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});