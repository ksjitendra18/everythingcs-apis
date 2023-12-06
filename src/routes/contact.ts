import { Hono } from "hono";
// import { customAlphabet } from "nanoid";
import { env } from "hono/adapter";
import createContact from "../controllers/contact/new";
import getAllContacts from "../controllers/contact/get";

type Bindings = {
  DB: D1Database;
  database_id: string;
  database_name: string;
};

export const contactApiV1 = new Hono<{ Bindings: Bindings }>();

contactApiV1.post("/", createContact);
contactApiV1.get("/", getAllContacts);
