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
import { timestamps } from "./common";

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

    paidAmount: decimal("paid_amount", {
      precision: 10,
      scale: 2,
    })
    .default("0")
    .notNull(),

    status: invoiceStatusEnum("status")
      .default("UNPAID")
      .notNull(),

    ...timestamps
  },
  (table) => [
    index("invoice_clinic_idx").on(table.clinicId),

    index("invoice_patient_idx").on(table.patientId),

    uniqueIndex("invoices_clinic_number_unique").on(
        table.clinicId,
        table.invoiceNumber
    ),

    index("invoice_status_idx").on(
        table.status
    ),

    index("invoice_created_idx").on(
        table.createdAt
    ),
  ]
);