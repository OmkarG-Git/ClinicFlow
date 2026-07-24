// clinic-counters.ts

import {
    integer,
    pgTable,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

export const clinicCounters = pgTable(
    "clinic_counters",
    {
        clinicId: uuid("clinic_id")
            .primaryKey()
            .references(() => clinics.id, {
                onDelete: "cascade",
            }),

        patientCounter: integer("patient_counter")
            .default(0)
            .notNull(),

        appointmentCounter: integer("appointment_counter")
            .default(0)
            .notNull(),

        invoiceCounter: integer("invoice_counter")
            .default(0)
            .notNull(),

        visitCounter: integer("visit_counter")
            .default(0)
            .notNull(),

        prescriptionCounter: integer("prescription_counter")
            .default(0)
            .notNull(),

        paymentCounter: integer("payment_counter")
            .default(0)
            .notNull(),

        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull(),
    }
);