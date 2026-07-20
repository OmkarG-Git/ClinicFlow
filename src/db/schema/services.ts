import {
  boolean,
  decimal,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { clinics } from "./clinics";
import { activeColumn, timestamps } from "./common";

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clinicId: uuid("clinic_id")
      .notNull()
      .references(() => clinics.id, { onDelete: "cascade" }),

    serviceCode: text("service_code").notNull(),

    name: text("name").notNull(),

    description: text("description"),

    duration: integer("duration").notNull(),

    price: decimal("price", {
      precision: 10,
      scale: 2,
    }).notNull(),

    ...activeColumn,

    ...timestamps,
  },
  (table) => [
    index("services_clinic_idx").on(table.clinicId),
    uniqueIndex("services_code_unique")
    .on(
        table.clinicId,
        table.serviceCode
    ),
  ]
);