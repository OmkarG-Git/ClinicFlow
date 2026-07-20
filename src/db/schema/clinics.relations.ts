import { relations } from "drizzle-orm";

import { clinics } from "./clinics";
import { users } from "./users";

export const clinicsRelations = relations(clinics, ({ many }) => ({
  users: many(users),
}));