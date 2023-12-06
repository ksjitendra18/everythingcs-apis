import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    dbName: "ecsdbv1",
    wranglerConfigPath: "./wrangler.toml",
  },
  driver: "d1",
} satisfies Config;
