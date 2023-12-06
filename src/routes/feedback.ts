import { Hono } from "hono";
import createFeedback from "../controllers/feedback/createFeedback";
import getAllFeedbacks from "../controllers/feedback/getFeedback";

type Bindings = {
  DB: D1Database;
  database_id: string;
  database_name: string;
};

export const feedbackApiV1 = new Hono<{ Bindings: Bindings }>();

feedbackApiV1.post("/", createFeedback);
feedbackApiV1.get("/", getAllFeedbacks);
