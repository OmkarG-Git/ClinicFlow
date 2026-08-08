import {
  jsonb,
  pgTable,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { users } from "./users";
import { timestamps } from "./common";

export const userLayouts = pgTable(
  "user_layouts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    layout: jsonb("layout")
      .$type<{
        sidebar: Record<string, boolean>;

        dashboard: Record<string, boolean>;

        quickActions: Record<string, boolean>;
      }>()
      .notNull(),

    ...timestamps,
  },
  (table) => [
    uniqueIndex("user_layout_unique").on(
      table.clinicId,
      table.userId
    ),
  ]
);