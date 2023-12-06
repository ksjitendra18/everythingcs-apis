import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, int } from "drizzle-orm/sqlite-core";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

export const event = sqliteTable("event", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  type: text("type").notNull(),
  slug: text("slug").notNull(),
  referrer: text("referrer").notNull(),
  country: text("country").notNull(),
  ip: text("ip").notNull(),
  os: text("os"),
  browser: text("browser"),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
