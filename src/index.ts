import { Hono } from "hono";
import { cors } from "hono/cors";
import { contactApiV1 } from "./routes/contact";
import { eventsApiV1 } from "./routes/event";
import { feedbackApiV1 } from "./routes/feedback";

type Bindings = {
  DB: D1Database;
  database_id: string;
  database_name: string;
};

const V1Api = new Hono<{ Bindings: Bindings }>().basePath("/v1");
V1Api.use(
  "/*",
  cors({
    origin: [
      "https://everythingcs.dev",
      "https://www.everythingcs.dev",
      "https://dev.everythingcs.pages.dev",
    ],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
  })
);
V1Api.route("/contact", contactApiV1);
V1Api.route("/events", eventsApiV1);
V1Api.route("/feedback", feedbackApiV1);

V1Api.get("/", async (c) => {
  return c.json({
    success: true,
    data: {
      message: "Hello",
    },
  });
});

export default V1Api;
