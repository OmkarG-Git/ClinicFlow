import {
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { doctorProfiles } from "./doctor-profiles";
import { timestamps } from "./common";

export const doctorLeaves = pgTable(
  "doctor_leaves",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    doctorId: uuid("doctor_id")
      .notNull()
      .references(() => doctorProfiles.id, {
        onDelete: "cascade",
    }),

    startDate: date("start_date").notNull(),

    endDate: date("end_date").notNull(),

    reason: text("reason"),

    ...timestamps,
  },
  (table) => [
    index("doctor_leave_idx").on(table.doctorId),
  ]
);