import {
  boolean,
  index,
  uniqueIndex,
  pgTable,
  text,
  timestamp,
  date,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { userRoleEnum, genderEnum } from "./enums";
import { activeColumn, timestamps } from "./common";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    isOnboarded: boolean("is_onboarded")
    .default(false)
    .notNull(),

    role: userRoleEnum("role").default("OWNER").notNull(),

    firstName: text("first_name").notNull(),

    lastName: text("last_name").notNull(),

    email: text("email").notNull().unique(),

    password: text("password").notNull(),

    address: text("address"),

    phone: text("phone"),

    gender: genderEnum("gender"),

    dateOfBirth: date("date_of_birth"),

    avatarUrl: text("avatar_url"),

    ...activeColumn,

    ...timestamps,
  },
  (table) => [
    index("users_clinic_idx").on(table.clinicId),

    index("users_role_idx").on(
        table.role
    ),

    index("users_clinic_role_idx").on(
        table.clinicId,
        table.role
    ),

    uniqueIndex("users_clinic_email_unique").on(
        table.clinicId,
        table.email
    ),
  ]
);