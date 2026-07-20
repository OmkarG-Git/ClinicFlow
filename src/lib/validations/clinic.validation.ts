import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().trim().min(3, "Clinic name is required"),

  clinicType: z.enum(
  [
    "GENERAL",
    "DENTAL",
    "EYE",
    "ENT",
    "ORTHOPEDIC",
    "PEDIATRIC",
    "PHYSIOTHERAPY",
    "SKIN",
  ],
  "Clinic type is required"
),

  phone: z.string().min(10, "Phone number is required"),

  email: z.email().optional().or(z.literal("")),

  address: z.string().optional(),

  city: z.string().optional(),

  state: z.string().optional(),

  postalCode: z.string().optional(),

  logoUrl: z.string().optional(),

  website: z.string().optional(),

  gstNumber: z.string().optional(),

  openingTime: z.string().min(1, "Opening time is required"),

  closingTime: z.string().min(1, "Closing time is required"),

  workingDays: z
    .array(z.string())
    .min(1, "Select at least one working day"),
});

export type ClinicSchema = z.infer<typeof clinicSchema>;