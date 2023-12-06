import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, int } from "drizzle-orm/sqlite-core";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

export const token = sqliteTable("token", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  expires: int("timestamp").notNull(),
});
