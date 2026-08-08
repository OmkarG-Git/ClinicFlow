import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { patients } from "./patients";
import { users } from "./users";
import { appointments } from "./appointments";
import { services } from "./services";

import {
  visitStatusEnum,
  visitTypeEnum,
} from "./enums";

import { timestamps } from "./common";

export const visits = pgTable(
  "visits",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id),

    doctorUserId: uuid("doctor_user_id")
      .references(() => users.id),

    appointmentId: uuid("appointment_id")
      .references(() => appointments.id),

    serviceId: uuid("service_id")
      .references(() => services.id),

    visitNumber: text("visit_number")
      .notNull(),

    visitType: visitTypeEnum("visit_type")
      .notNull(),

    status: visitStatusEnum("status")
      .default("WAITING")
      .notNull(),

    chiefComplaint: text("chief_complaint"),

    notes: text("notes"),

    tokenNumber: text("token_number"),

    checkedInAt: timestamp("checked_in_at", {
      withTimezone: true,
    }),

    consultationStartedAt: timestamp(
      "consultation_started_at",
      {
        withTimezone: true,
      }
    ),

    completedAt: timestamp("completed_at", {
      withTimezone: true,
    }),

    createdBy: uuid("created_by")
      .references(() => users.id),

    ...timestamps,
  },
  (table) => [
    index("visit_clinic_idx").on(table.clinicId),

    index("visit_patient_idx").on(table.patientId),

    index("visit_doctor_idx").on(table.doctorUserId),

    index("visit_status_idx").on(table.status),

    index("visit_service_idx").on(table.serviceId),

    index("visit_appointment_idx").on(table.appointmentId),

    uniqueIndex("visit_number_unique").on(
      table.clinicId,
      table.visitNumber
    ),
  ]
);