import {
  boolean,
  index,
  uniqueIndex,
  pgTable,
  text,
  timestamp,
  uuid,
  time,
  
} from "drizzle-orm/pg-core";

import { clinicTypeEnum } from "./enums";
import { activeColumn, timestamps } from "./common";

export const clinics = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  clinicType: clinicTypeEnum("clinic_type").notNull(),

  email: text("email").unique().notNull(),

  phone: text("phone").notNull(),

  address: text("address"),

  city: text("city"),

  state: text("state"),

  postalCode: text("postal_code"),

  logoUrl: text("logo_url"),

  workingDays: text("working_days")
    .array()
    .default([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ])
    .notNull(),

  openingTime: time("opening_time")
    .default("09:00:00")
    .notNull(),

  closingTime: time("closing_time")
    .default("18:00:00")
    .notNull(),

  gstNumber: text("gst_number"),

  website: text("website"),

  ...activeColumn,

  ...timestamps,
},
  (table) => [
    index("clinics_phone_idx").on(table.phone),
  ]
);