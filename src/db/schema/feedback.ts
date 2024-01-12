import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, int } from "drizzle-orm/sqlite-core";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  5
);

export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey(),
  rating: integer("rating").notNull(),
  message: text("message"),
  slug: text("slug").notNull(),
  isResolved: integer("is_resolved", { mode: "boolean" })
    .notNull()
    .default(false),
  ip: text("ip").notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
