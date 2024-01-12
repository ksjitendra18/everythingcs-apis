import { Hono } from "hono";
import createEvent from "../controllers/events/post";
import getAllEvents from "../controllers/events/all";
import getAllTodayEvent from "../controllers/events/todayAll";
import getEventsInfo from "../controllers/events/get";
import getTodayEvent from "../controllers/events/today";
import seedEvents from "../controllers/events/seed";
import deleteEvent from "../controllers/events/delete";

type Bindings = {
  DB: D1Database;
  database_id: string;
  database_name: string;
};

export const eventsApiV1 = new Hono<{ Bindings: Bindings }>();

eventsApiV1.post("/", createEvent);
eventsApiV1.get("/", getEventsInfo);
eventsApiV1.get("/all", getAllEvents);
eventsApiV1.get("/today", getTodayEvent);
eventsApiV1.get("/today/all", getAllTodayEvent);
eventsApiV1.get("/seed", seedEvents);
eventsApiV1.delete("/:eventId", deleteEvent);
