import { relations } from "drizzle-orm";

import {
  appointments,
  clinics,
  doctorLeaves,
  doctorProfiles,
  doctorSchedules,
  invoiceItems,
  invoices,
  patientNotes,
  patients,
  payments,
  services,
  users,
} from "./schema";


export const clinicsRelations = relations(clinics, ({ many }) => ({
  users: many(users),
  doctorProfiles: many(doctorProfiles),
  patients: many(patients),
  services: many(services),
  appointments: many(appointments),
  invoices: many(invoices),
}));


export const usersRelations = relations(users, ({ one, many }) => ({
  clinic: one(clinics, {
    fields: [users.clinicId],
    references: [clinics.id],
  }),

  doctorProfile: one(doctorProfiles),
  appointments: many(appointments),
}));


export const doctorProfilesRelations = relations(
  doctorProfiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [doctorProfiles.userId],
      references: [users.id],
    }),

    clinic: one(clinics, {
      fields: [doctorProfiles.clinicId],
      references: [clinics.id],
    }),

    schedules: many(doctorSchedules),

    leaves: many(doctorLeaves),

    notes: many(patientNotes),
  })
);


export const doctorSchedulesRelations = relations(
  doctorSchedules,
  ({ one }) => ({
    doctor: one(doctorProfiles, {
      fields: [doctorSchedules.doctorId],
      references: [doctorProfiles.userId],
    }),
  })
);


export const doctorLeavesRelations = relations(
  doctorLeaves,
  ({ one }) => ({
    doctor: one(doctorProfiles, {
      fields: [doctorLeaves.doctorId],
      references: [doctorProfiles.userId],
    }),
  })
);


export const patientsRelations = relations(
  patients,
  ({ one, many }) => ({
    clinic: one(clinics, {
      fields: [patients.clinicId],
      references: [clinics.id],
    }),

    appointments: many(appointments),

    notes: many(patientNotes),

    invoices: many(invoices),
  })
);


export const patientNotesRelations = relations(
  patientNotes,
  ({ one }) => ({
    patient: one(patients, {
      fields: [patientNotes.patientId],
      references: [patients.id],
    }),

    doctor: one(doctorProfiles, {
      fields: [patientNotes.doctorId],
      references: [doctorProfiles.userId],
    }),
  })
);


export const servicesRelations = relations(
  services,
  ({ one, many }) => ({
    clinic: one(clinics, {
      fields: [services.clinicId],
      references: [clinics.id],
    }),

    appointments: many(appointments),
  })
);


export const appointmentsRelations = relations(
  appointments,
  ({ one }) => ({
    clinic: one(clinics, {
      fields: [appointments.clinicId],
      references: [clinics.id],
    }),

    patient: one(patients, {
      fields: [appointments.patientId],
      references: [patients.id],
    }),

    doctor: one(doctorProfiles, {
      fields: [appointments.doctorUserId],
      references: [doctorProfiles.userId],
    }),

    service: one(services, {
      fields: [appointments.serviceId],
      references: [services.id],
    }),

    createdByUser: one(users, {
      fields: [appointments.createdBy],
      references: [users.id],
    }),
  })
);


export const invoicesRelations = relations(
  invoices,
  ({ one, many }) => ({
    clinic: one(clinics, {
      fields: [invoices.clinicId],
      references: [clinics.id],
    }),

    patient: one(patients, {
      fields: [invoices.patientId],
      references: [patients.id],
    }),

    appointment: one(appointments, {
      fields: [invoices.appointmentId],
      references: [appointments.id],
    }),

    items: many(invoiceItems),

    payments: many(payments),
  })
);


export const invoiceItemsRelations = relations(
  invoiceItems,
  ({ one }) => ({
    invoice: one(invoices, {
      fields: [invoiceItems.invoiceId],
      references: [invoices.id],
    }),
  })
);


export const paymentsRelations = relations(
  payments,
  ({ one }) => ({
    invoice: one(invoices, {
      fields: [payments.invoiceId],
      references: [invoices.id],
    }),
  })
);