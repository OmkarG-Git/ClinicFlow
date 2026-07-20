import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { timestamps } from "./common";

export const clinicSettings = pgTable("clinic_settings", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  clinicId: uuid("clinic_id")
    .notNull()
    .unique()
    .references(() => clinics.id, {
      onDelete: "cascade",
    }),

  appointmentInterval: integer("appointment_interval")
    .default(15)
    .notNull(),

  ...timestamps,
});