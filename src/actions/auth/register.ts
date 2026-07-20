import { z } from "zod";

export const registerSchema = z
  .object({

    firstName: z.string().trim().min(2).max(50),

    lastName: z.string().trim().min(2).max(50),

    email: z.email().trim().toLowerCase().max(255),

    password: z.string().min(8).max(100),

    confirmPassword: z.string(),

    clinicName: z.string().trim().min(2).max(100),

    clinicType: z.enum([
      "GENERAL",
      "DENTAL",
      "EYE",
      "ENT",
      "ORTHOPEDIC",
      "PEDIATRIC",
      "PHYSIOTHERAPY",
      "SKIN",
    ]),

    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    address: z.string().trim().min(5).max(250),

    city: z.string().trim().min(2).max(50),

    state: z.string().trim().min(2).max(50),

    postalCode: z
      .string()
      .regex(/^[0-9]{6}$/, "Invalid PIN code"),

    // =========================
    // Clinic Settings
    // =========================
    workingDays: z
      .array(
        z.enum([
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ])
      )
      .default([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ]),

    openingTime: z.string().optional(),

    closingTime: z.string().optional(),

    gstNumber: z.string().trim().max(15).optional(),

    website: z.string().url().optional().or(z.literal("")),

    ownerIsDoctor: z.boolean(),

    specialization: z.string().optional(),

    qualification: z.string().optional(),

    experienceYears: z.number().min(0).max(60).optional(),

    consultationFee: z.number().positive().max(100000).optional(),

    registrationNumber: z.string().trim().max(100).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }

    if (data.ownerIsDoctor) {
      if (!data.specialization) {
        ctx.addIssue({
          path: ["specialization"],
          code: "custom",
          message: "Specialization is required",
        });
      }

      if (!data.qualification) {
        ctx.addIssue({
          path: ["qualification"],
          code: "custom",
          message: "Qualification is required",
        });
      }

      if (data.consultationFee === undefined) {
        ctx.addIssue({
          path: ["consultationFee"],
          code: "custom",
          message: "Consultation fee is required",
        });
      }

      if (!data.registrationNumber) {
        ctx.addIssue({
          path: ["registrationNumber"],
          code: "custom",
          message: "Registration number is required",
        });
      }
    }
  });

export type RegisterInput = z.infer<typeof registerSchema>;