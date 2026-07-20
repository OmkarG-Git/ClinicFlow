import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import {
  bloodGroupEnum,
  genderEnum,
  maritalStatusEnum,
} from "./enums";
import { activeColumn, timestamps } from "./common";

export const patients = pgTable(
  "patients",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    patientCode: text("patient_code").notNull(),

    firstName: text("first_name").notNull(),

    lastName: text("last_name"),

    gender: genderEnum("gender"),

    age: integer("age"),

    dateOfBirth: date("date_of_birth"),

    bloodGroup: bloodGroupEnum("blood_group"),

    phone: text("phone").notNull(),

    email: text("email"),

    occupation: text("occupation"),

    maritalStatus: maritalStatusEnum("marital_status"),

    address: text("address"),

    city: text("city"),

    state: text("state"),

    emergencyContactName: text("emergency_contact_name"),

    emergencyContactPhone: text("emergency_contact_phone"),

    allergies: text("allergies"),

    medicalNotes: text("medical_notes"),

    ...activeColumn,

    ...timestamps
  },
  (table) => [
    index("patients_clinic_idx").on(table.clinicId),

    index("patients_phone_idx").on(table.phone),

    uniqueIndex("patients_code_unique")
    .on(table.clinicId, table.patientCode),
  ]
);