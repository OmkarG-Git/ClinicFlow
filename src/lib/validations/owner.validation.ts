import { z } from "zod"

export const createOwnerSchema = z
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

        confirmPassword: z
            .string()
            .trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match"
    });

export type CreateOwnerSchema = z.infer<typeof createOwnerSchema>