import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  index
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { clinics } from "./clinics";
import { timestamps } from "./common";

export const doctorProfiles = pgTable("doctor_profiles", {

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinics.id,{
    onDelete:"cascade"
  }),

  specialization: text("specialization").notNull(),

  qualification: text("qualification"),

  experienceYears: integer("experience_years"),

  registrationNumber: text("registration_number").unique(),

  consultationFee: decimal("consultation_fee", {
    precision: 10,
    scale: 2,
  }).notNull(),

  bio: text("bio"),

  ...timestamps,
},
(table) => [
  index("doctor_profile_clinic_idx").on(
      table.clinicId
  ),

  index("doctor_profile_specialization_idx").on(
      table.specialization
  ),
]
);