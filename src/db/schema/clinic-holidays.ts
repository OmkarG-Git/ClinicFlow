import {
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

export const clinicHolidays = pgTable(
  "clinic_holidays",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    holidayDate: date("holiday_date")
      .notNull(),

    title: text("title")
      .notNull(),

    description: text("description"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("holiday_clinic_idx").on(
      table.clinicId
    ),
  ]
);