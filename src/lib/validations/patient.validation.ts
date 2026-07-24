// lib/validations/patient.validation.ts
import { z } from "zod";
import { bloodGroupEnum, genderEnum, maritalStatusEnum } from "@/db/schema";

// Define the form schema with explicit types (all fields required or explicitly optional)
export const PatientFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name is too long"),
  
  lastName: z
    .string()
    .trim()
    .max(100, "Last name is too long")
    .optional()
    .default(""),
  
  gender: z
    .enum(genderEnum.enumValues)
    .nullable()
    .default(null),
  
  age: z
    .number()
    .int("Age must be an integer")
    .min(0, "Age cannot be negative")
    .max(150, "Invalid age")
    .nullable()
    .default(null),
  
  dateOfBirth: z
    .string()
    .date("Invalid date")
    .nullable()
    .default(null),
  
  bloodGroup: z
    .enum(bloodGroupEnum.enumValues)
    .nullable()
    .default(null),
  
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  
  email: z
    .string()
    .email("Invalid email address")
    .nullable()
    .default(null),
  
  occupation: z
    .string()
    .trim()
    .max(100, "Occupation is too long")
    .nullable()
    .default(null),
  
  maritalStatus: z
    .enum(maritalStatusEnum.enumValues)
    .nullable()
    .default(null),
  
  address: z
    .string()
    .trim()
    .max(500, "Address is too long")
    .nullable()
    .default(null),
  
  city: z
    .string()
    .trim()
    .max(100, "City name is too long")
    .nullable()
    .default(null),
  
  state: z
    .string()
    .trim()
    .max(100, "State name is too long")
    .nullable()
    .default(null),
  
  emergencyContactName: z
    .string()
    .trim()
    .max(100, "Emergency contact name is too long")
    .nullable()
    .default(null),
  
  emergencyContactPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .nullable()
    .default(null),
  
  allergies: z
    .string()
    .trim()
    .max(1000, "Allergies field is too long")
    .nullable()
    .default(null),
  
  medicalNotes: z
    .string()
    .trim()
    .max(5000, "Medical notes are too long")
    .nullable()
    .default(null),
  
  isActive: z.boolean().default(true),
  
  // These are from the parent component, not the form
  clinicId: z.string().uuid("Invalid clinic ID").optional(),
  patientCode: z.string().optional(),
});

// Add conditional validations
export const PatientFormValidation = PatientFormSchema
  .refine(
    (data) => {
      // If emergency contact name is provided, phone is required
      if (data.emergencyContactName && !data.emergencyContactPhone) {
        return false;
      }
      return true;
    },
    {
      message: "Emergency contact phone is required when name is provided",
      path: ["emergencyContactPhone"],
    }
  )
  .refine(
    (data) => {
      // If emergency contact phone is provided, name is required
      if (data.emergencyContactPhone && !data.emergencyContactName) {
        return false;
      }
      return true;
    },
    {
      message: "Emergency contact name is required when phone is provided",
      path: ["emergencyContactName"],
    }
  )
  .refine(
    (data) => {
      // At least one of age or dateOfBirth should be provided
      if (!data.age && !data.dateOfBirth) {
        return false;
      }
      return true;
    },
    {
      message: "Please provide either age or date of birth",
      path: ["age"],
    }
  );

// Type for the form
export type PatientFormValues = {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  age: number | null;
  dateOfBirth: string | null;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | null;
  phone: string;
  email: string | null;
  occupation: string | null;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | null;
  address: string | null;
  city: string | null;
  state: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  allergies: string | null;
  medicalNotes: string | null;
  isActive: boolean;
  clinicId?: string;
  patientCode?: string;
};