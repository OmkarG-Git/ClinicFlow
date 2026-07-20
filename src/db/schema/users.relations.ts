import { relations } from "drizzle-orm";

import { users } from "./users";
import { clinics } from "./clinics";

export const usersRelations = relations(users, ({ one }) => ({
  clinic: one(clinics, {
    fields: [users.clinicId],
    references: [clinics.id],
  }),
}));