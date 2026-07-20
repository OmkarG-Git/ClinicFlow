import { z } from "zod"

export const userValidationSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, "First name is required"),

        lastName: z
            .string()
            .trim()
            .min(2, "Last name is required"),

        email: z
            .email("Invalid email")
            .trim(),

        password: z
            .string()
            .trim()
            .min(8)
            .max(12, "Password must be at least 8 to 12 characters"),
        
        role: z.enum([
            "DOCTOR",
            "RECEPTIONIST"
        ], "Something went wrong try again later"),

        clinicId: z.string().trim().nullable()
    })


export type UserValidationSchemaType = z.infer<typeof userValidationSchema>
