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
  "SUPER_ADMIN",
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
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
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
  "CONSULTATION",
  "FOLLOW_UP",
  "CHECKUP",
  "EMERGENCY",
  "WALK_IN",
  "ONLINE",
  "PROCEDURE",
  "LAB_REVIEW",
]);
/* -------------------------------------------------------------------------- */
/*                               Invoice Status                               */
/* -------------------------------------------------------------------------- */


export const paymentStatusEnum = pgEnum("payment_status", [
  "Pending",
  "Success",
  "Failed",
  "Refunded",
])


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
/*                           Visit Type                                       */
/* -------------------------------------------------------------------------- */

export const visitTypeEnum = pgEnum("visit_type", [
  "WALK_IN",
  "APPOINTMENT",
]);

export const visitStatusEnum = pgEnum("visit_status", [
  "WAITING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);


export const workflowTypeEnum = pgEnum(
  "workflow_type",
  [
    "APPOINTMENT",
    "WALK_IN",
    "HYBRID",
  ]
);




export const permissionResourceEnum = pgEnum(
  "permission_resource",
  [
    "DASHBOARD",
    "PATIENTS",
    "VISITS",
    "APPOINTMENTS",
    "DOCTORS",
    "RECEPTIONISTS",
    "PRESCRIPTIONS",
    "SERVICES",
    "BILLING",
    "INVOICES",
    "PAYMENTS",
    "INVENTORY",
    "REPORTS",
    "SETTINGS",
    "STAFF",
    "CLINIC",
  ]
);

export const permissionActionEnum = pgEnum(
  "permission_action",
  [
    "VIEW",
    "CREATE",
    "EDIT",
    "DELETE",
    "EXPORT",
    "MANAGE",
  ]
);


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

export type PaymentStatus =
  typeof paymentStatusEnum.enumValues[number];

export type WeekDay =
  typeof weekDayEnum.enumValues[number];

export type NotificationType =
  typeof notificationTypeEnum.enumValues[number];

export type NotificationPriority =
  typeof notificationPriorityEnum.enumValues[number];

export type permissionResourceType = 
  typeof permissionResourceEnum.enumValues[number];

export type permissionActionType = 
  typeof permissionActionEnum.enumValues[number];