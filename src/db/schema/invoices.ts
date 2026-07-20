import {
  decimal,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { patients } from "./patients";
import { appointments } from "./appointments";
import { invoiceStatusEnum } from "./enums";

export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id),

    appointmentId: uuid("appointment_id")
      .references(() => appointments.id),

    invoiceNumber: text("invoice_number")
      .notNull()
      .unique(),

    subtotal: decimal("subtotal", {
      precision: 10,
      scale: 2,
    }).notNull(),

    discount: decimal("discount", {
      precision: 10,
      scale: 2,
    })
      .default("0")
      .notNull(),

    tax: decimal("tax", {
      precision: 10,
      scale: 2,
    })
      .default("0")
      .notNull(),

    total: decimal("total", {
      precision: 10,
      scale: 2,
    }).notNull(),

    status: invoiceStatusEnum("status")
      .default("UNPAID")
      .notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("invoice_clinic_idx").on(table.clinicId),

    index("invoice_patient_idx").on(table.patientId),

    uniqueIndex("invoices_clinic_number_unique").on(
        table.clinicId,
        table.invoiceNumber
    )
  ]
);