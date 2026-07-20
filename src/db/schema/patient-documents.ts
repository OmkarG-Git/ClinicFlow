import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { patients } from "./patients";
import { users } from "./users";

export const patientDocuments = pgTable(
  "patient_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, {
        onDelete: "cascade",
      }),

    fileName: text("file_name").notNull(),

    fileUrl: text("file_url").notNull(),

    mimeType: text("mime_type").notNull(),

    uploadedBy: uuid("uploaded_by")
      .references(() => users.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("patient_document_idx").on(table.patientId),
  ]
);