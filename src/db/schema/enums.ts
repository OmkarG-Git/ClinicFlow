import { pgEnum } from "drizzle-orm/pg-core";

/* -------------------------------------------------------------------------- */
/*                                Clinic Types                                */
/* -------------------------------------------------------------------------- */

export const clinicTypeEnum = pgEnum("clinic_type", [
  "GENERAL",
  "DENTAL",
  "EYE",
  "ENT",
  "ORTHOPEDIC",
  "PEDIATRIC",
  "PHYSIOTHERAPY",
  "SKIN",
]);

/* -------------------------------------------------------------------------- */
/*                                 User Roles                                 */
/* -------------------------------------------------------------------------- */

export const userRoleEnum = pgEnum("user_role", [
  "OWNER",
  "DOCTOR",
  "RECEPTIONIST",
]);

/* -------------------------------------------------------------------------- */
/*                                   Gender                                   */
/* -------------------------------------------------------------------------- */

export const genderEnum = pgEnum("gender", [
  "MALE",
  "FEMALE",
  "OTHER",
]);

/* -------------------------------------------------------------------------- */
/*                              Marital Status                                */
/* -------------------------------------------------------------------------- */

export const maritalStatusEnum = pgEnum("marital_status", [
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
]);

/* -------------------------------------------------------------------------- */
/*                               Blood Groups                                 */
/* -------------------------------------------------------------------------- */

export const bloodGroupEnum = pgEnum("blood_group", [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
]);

/* -------------------------------------------------------------------------- */
/*                             Appointment Status                             */
/* -------------------------------------------------------------------------- */

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "SCHEDULED",
  "CHECKED_IN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);

/* -------------------------------------------------------------------------- */
/*                              Appointment Type                              */
/* -------------------------------------------------------------------------- */

export const appointmentTypeEnum = pgEnum("appointment_type", [
  "NEW",
  "FOLLOW_UP",
  "CONSULTATION",
  "EMERGENCY",
]);

/* -------------------------------------------------------------------------- */
/*                               Invoice Status                               */
/* -------------------------------------------------------------------------- */

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "UNPAID",
  "PARTIALLY_PAID",
  "PAID",
  "CANCELLED",
  "REFUNDED",
]);

/* -------------------------------------------------------------------------- */
/*                               Payment Method                               */
/* -------------------------------------------------------------------------- */

export const paymentMethodEnum = pgEnum("payment_method", [
  "CASH",
  "CARD",
  "UPI",
  "BANK_TRANSFER",
  "CHEQUE",
]);

/* -------------------------------------------------------------------------- */
/*                                Working Days                                */
/* -------------------------------------------------------------------------- */

export const weekDayEnum = pgEnum("week_day", [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

/* -------------------------------------------------------------------------- */
/*                           Notification Type                                */
/* -------------------------------------------------------------------------- */

export const notificationTypeEnum = pgEnum("notification_type", [
  "SYSTEM",
  "APPOINTMENT",
  "PAYMENT",
  "PATIENT",
  "STAFF",
]);

/* -------------------------------------------------------------------------- */
/*                         Notification Priority                              */
/* -------------------------------------------------------------------------- */

export const notificationPriorityEnum = pgEnum("notification_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
]);









/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ClinicType = typeof clinicTypeEnum.enumValues[number];

export type UserRole = typeof userRoleEnum.enumValues[number];

export type Gender = typeof genderEnum.enumValues[number];

export type MaritalStatus = typeof maritalStatusEnum.enumValues[number];

export type BloodGroup = typeof bloodGroupEnum.enumValues[number];

export type AppointmentStatus =
  typeof appointmentStatusEnum.enumValues[number];

export type AppointmentType =
  typeof appointmentTypeEnum.enumValues[number];

export type InvoiceStatus =
  typeof invoiceStatusEnum.enumValues[number];

export type PaymentMethod =
  typeof paymentMethodEnum.enumValues[number];

export type WeekDay =
  typeof weekDayEnum.enumValues[number];

export type NotificationType =
  typeof notificationTypeEnum.enumValues[number];

export type NotificationPriority =
  typeof notificationPriorityEnum.enumValues[number];