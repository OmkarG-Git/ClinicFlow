import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { patients } from "./patients";
import { doctorProfiles } from "./doctor-profiles";

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
      .references(() => doctorProfiles.id),

    note: text("note").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("patient_note_patient_idx").on(table.patientId),
  ]
);