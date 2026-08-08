import {
  boolean,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";

export const clinicNotificationSettings = pgTable(
  "clinic_notification_settings",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .unique()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    smsEnabled: boolean("sms_enabled")
      .default(false)
      .notNull(),

    emailEnabled: boolean("email_enabled")
      .default(true)
      .notNull(),

    whatsappEnabled: boolean("whatsapp_enabled")
      .default(false)
      .notNull(),

    appointmentReminder: boolean("appointment_reminder")
      .default(true)
      .notNull(),

    visitReminder: boolean("visit_reminder")
      .default(true)
      .notNull(),

    invoiceNotification: boolean("invoice_notification")
      .default(true)
      .notNull(),

    marketingNotification: boolean("marketing_notification")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);