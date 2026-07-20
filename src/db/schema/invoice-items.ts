import {
  decimal,
  integer,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { invoices } from "./invoices";

export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  invoiceId: uuid("invoice_id")
    .notNull()
    .references(() => invoices.id, {
      onDelete: "cascade",
    }),

  serviceName: text("service_name")
    .notNull(),

  quantity: integer("quantity")
    .default(1)
    .notNull(),

  price: decimal("price", {
    precision: 10,
    scale: 2,
  })
    .notNull(),

  total: decimal("total", {
    precision: 10,
    scale: 2,
  })
    .notNull(),
});