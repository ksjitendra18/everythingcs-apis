import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, int } from "drizzle-orm/sqlite-core";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

export const query = sqliteTable("query", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  blogPostLink: text("blog_post_link"),
  isResolved: integer("is_resolved", { mode: "boolean" })
    .notNull()
    .default(false),
  hasReplied: integer("has_replied", { mode: "boolean" })
    .notNull()
    .default(false),
  ip: text("ip").notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
