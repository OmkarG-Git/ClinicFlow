CREATE TYPE "public"."clinic_type" AS ENUM('GENERAL', 'DENTAL', 'EYE', 'ENT', 'ORTHOPEDIC', 'PEDIATRIC', 'PHYSIOTHERAPY', 'SKIN');--> statement-breakpoint
CREATE TABLE "clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"clinic_type" "clinic_type" NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"address" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"logo_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
