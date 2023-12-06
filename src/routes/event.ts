import { Hono } from "hono";
import createEvent from "../controllers/events/post";
import getAllEvents from "../controllers/events/get";

type Bindings = {
  DB: D1Database;
  database_id: string;
  database_name: string;
};

export const eventsApiV1 = new Hono<{ Bindings: Bindings }>();

eventsApiV1.post("/", createEvent);
eventsApiV1.get("/", getAllEvents);
