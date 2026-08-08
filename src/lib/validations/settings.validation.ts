import { z } from "zod";

export const workflowSettingsSchema = z.object({
  workflowType: z.enum([
    "APPOINTMENT",
    "WALK_IN",
    "HYBRID",
  ]),

  autoGenerateToken: z.boolean(),

  autoAssignDoctor: z.boolean(),

  requireServiceSelection: z.boolean(),
});

export type WorkflowSettingsInput =
  z.infer<typeof workflowSettingsSchema>;