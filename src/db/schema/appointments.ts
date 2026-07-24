import {
  date,
  index,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { patients } from "./patients";
import { doctorProfiles } from "./doctor-profiles";
import { services } from "./services";
import {
  appointmentStatusEnum,
  appointmentTypeEnum,
} from "./enums";
import { users } from "./users";
import { timestamps } from "./common";

export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id),

    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id),

    doctorUserId: uuid("doctor_id")
      .notNull()
      .references(() => users.id),

    serviceId: uuid("service_id")
      .references(() => services.id),

    appointmentNumber: text("appointment_number").notNull().unique(),

    appointmentType: appointmentTypeEnum("appointment_type").notNull(),

    appointmentDate: date("appointment_date").notNull(),

    startTime: time("start_time").notNull(),

    endTime: time("end_time").notNull(),

    status: appointmentStatusEnum("status")
            .default("SCHEDULED")
            .notNull(),

    chiefComplaint: text("chief_complaint"),

    notes: text("notes"),

    checkedInAt: timestamp("checked_in_at", {
      withTimezone: true,
    }),

    completedAt: timestamp("completed_at", {
      withTimezone: true,
    }),

    cancelReason: text("cancel_reason"),

    createdBy: uuid("created_by")
      .references(() => users.id),

    ...timestamps,
  },
  (table) => [
    index("appointment_clinic_idx").on(table.clinicId),
    index("appointment_patient_idx").on(table.patientId),
    index("appointment_doctor_idx").on(table.doctorUserId),
    index("appointment_date_idx").on(
        table.appointmentDate
    ),
    index("appointment_doctor_date_idx").on(
        table.doctorUserId,
        table.appointmentDate
    ),
    index("appointment_clinic_date_idx").on(
        table.clinicId,
        table.appointmentDate
    ),
    index("appointment_status_idx").on(
        table.status
    ),
    uniqueIndex("appointments_clinic_number_unique").on(
        table.clinicId,
        table.appointmentNumber
    ),
  ]
);