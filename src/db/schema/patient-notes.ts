import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { patients } from "./patients";
import { users } from "./users";
export const patientNotes = pgTable(
  "patient_notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, {
        onDelete: "cascade",
      }),

    doctorId: uuid("doctor_id")
      .notNull()
      .references(() => users.id),

    note: text("note").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("patient_note_patient_idx").on(table.patientId),

    index("patient_note_doctor_idx").on(
        table.doctorId
    ),
  ]
);