import {
  decimal,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { invoices } from "./invoices";
import { paymentMethodEnum } from "./enums";

export const payments = pgTable(
  "payments",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, {
        onDelete: "cascade",
      }),

    amount: decimal("amount", {
      precision: 10,
      scale: 2,
    })
      .notNull(),

    method: paymentMethodEnum("method")
      .notNull(),

    transactionId: text("transaction_id"),

    note: text("note"),

    paidAt: timestamp("paid_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("payment_invoice_idx")
      .on(table.invoiceId),
  ]
);