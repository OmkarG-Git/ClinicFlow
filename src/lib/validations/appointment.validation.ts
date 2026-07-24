import { appointmentStatusEnum, appointmentTypeEnum } from "@/db/schema";
import { z } from "zod";

export const appointmentValidationSchema = z
  .object({

    patientId: z.uuid("Invalid patient ID"),

    doctorId: z.uuid("Invalid doctor ID"),

    serviceId: z.uuid("Invalid service ID").optional(),

    appointmentType: z.enum(appointmentTypeEnum.enumValues),

    appointmentDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD required)"),

    startTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        "Invalid start time"
      ),

    endTime: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        "Invalid end time"
      ),

    status: z
      .enum(appointmentStatusEnum.enumValues)
      .optional(),

    chiefComplaint: z
      .string()
      .trim()
      .max(1000, "Chief complaint is too long")
      .optional()
      .or(z.literal("")),

    notes: z
      .string()
      .trim()
      .max(5000, "Notes are too long")
      .optional()
      .or(z.literal("")),

    checkedInAt: z.iso.datetime().optional(),

    completedAt: z.iso.datetime().optional(),

    cancelReason: z
      .string()
      .trim()
      .max(1000, "Cancel reason is too long")
      .optional()
      .or(z.literal("")),

    createdBy: z.uuid("Invalid user ID").optional(),
  })
  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },
    {
      path: ["endTime"],
      message: "End time must be after start time",
    }
  );

export type appointmentSchemaType = z.infer<
  typeof appointmentValidationSchema
>;