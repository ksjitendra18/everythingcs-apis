import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { event } from "../../db/schema/event";
import { eq } from "drizzle-orm";

const deleteEvent = async (c: Context) => {
  const db = drizzle(c.env.DB);
  const { eventId } = c.req.param();

  console.log("event", eventId);
  if (!eventId) {
    return c.json(
      { error: "validation_error", message: "Event ID is required" },
      400
    );
  }
  try {
    // await db.delete(event).where(eq(event.id, eventId));
    await db.delete(event);
    return c.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("error while deleting event", error);
    return c.json({ error: "server_error", message: "Server Error" }, 500);
  }
};

export default deleteEvent;
