CREATE TYPE "public"."appointment_status" AS ENUM('SCHEDULED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');--> statement-breakpoint
CREATE TYPE "public"."appointment_type" AS ENUM('NEW', 'FOLLOW_UP', 'ONLINE', 'WALK_IN');--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT');--> statement-breakpoint
CREATE TYPE "public"."blood_group" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
CREATE TYPE "public"."clinic_type" AS ENUM('GENERAL', 'DENTAL', 'EYE', 'ENT', 'ORTHOPEDIC', 'PEDIATRIC', 'PHYSIOTHERAPY', 'SKIN');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('UNPAID', 'PARTIAL', 'PAID');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('CASH', 'CARD', 'UPI');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('OWNER', 'DOCTOR', 'RECEPTIONIST');--> statement-breakpoint
CREATE TABLE "clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"clinic_type" "clinic_type" NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"logo_url" text,
	"working_days" text[],
	"opening_time" time,
	"closing_time" time,
	"gst_number" text,
	"website" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "clinics_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid NOT NULL,
	"clinic_id" uuid NOT NULL,
	"role" "user_role" NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"address" text,
	"phone" text,
	"gender" "gender",
	"date_of_birth" date,
	"avatar_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_user_id_unique" UNIQUE("auth_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "doctor_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"clinic_id" uuid NOT NULL,
	"specialization" text NOT NULL,
	"qualification" text,
	"experience_years" integer,
	"registration_number" text,
	"consultation_fee" numeric(10, 2) NOT NULL,
	"bio" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "doctor_profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "doctor_profiles_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE TABLE "doctor_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doctor_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"break_start" time,
	"break_end" time,
	"slot_duration" integer DEFAULT 15 NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clinic_id" uuid NOT NULL,
	"patient_code" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"gender" "gender",
	"age" integer,
	"date_of_birth" date,
	"blood_group" "blood_group",
	"phone" text NOT NULL,
	"email" text,
	"occupation" text,
	"marital_status" "marital_status",
	"address" text,
	"city" text,
	"state" text,
	"emergency_contact_name" text,
	"emergency_contact_phone" text,
	"allergies" text,
	"medical_notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clinic_id" uuid NOT NULL,
	"service_code" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"duration" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctor_id_doctor_profiles_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clinics_phone_idx" ON "clinics" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "clinics_email_unique" ON "clinics" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_clinic_idx" ON "users" USING btree ("clinic_id");--> statement-breakpoint
CREATE INDEX "users_auth_idx" ON "users" USING btree ("auth_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_clinic_email_unique" ON "users" USING btree ("clinic_id","email");--> statement-breakpoint
CREATE INDEX "doctor_schedule_doctor_idx" ON "doctor_schedules" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "patients_clinic_idx" ON "patients" USING btree ("clinic_id");--> statement-breakpoint
CREATE INDEX "patients_phone_idx" ON "patients" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "patients_code_unique" ON "patients" USING btree ("clinic_id","patient_code");--> statement-breakpoint
CREATE INDEX "services_clinic_idx" ON "services" USING btree ("clinic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "services_code_unique" ON "services" USING btree ("clinic_id","service_code");