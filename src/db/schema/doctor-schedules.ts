import {
  boolean,
  index,
  integer,
  pgTable,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { timestamps } from "./common";

export const doctorSchedules = pgTable(
  "doctor_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    doctorId: uuid("doctor_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    // 0 = Sunday, 1 = Monday ... 6 = Saturday
    dayOfWeek: integer("day_of_week").notNull(),

    startTime: time("start_time").notNull(),

    endTime: time("end_time").notNull(),

    breakStart: time("break_start"),

    breakEnd: time("break_end"),

    slotDuration: integer("slot_duration")
      .default(15)
      .notNull(),

    isAvailable: boolean("is_available")
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => [
    index("doctor_schedule_doctor_idx").on(table.doctorId),

    index("doctor_schedule_day_idx").on(
        table.dayOfWeek
    ),
  ]
);