import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { event } from "../../db/schema/event";
import { token } from "../../db/schema/token";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const getTodayEvent = async (c: Context) => {
  let { event } = c.req.query();

  event = event ?? "scroll";

  const db = drizzle(c.env.DB);

  try {
    const authToken = c.req.header("x-auth-token");

    if (!authToken) {
      return c.json(
        {
          message: "Unauthorised",
        },
        401
      );
    }

    const exists = await db.select().from(token).where(eq(token.id, authToken));

    if (!exists || exists?.length < 1) {
      return c.json(
        {
          message: "Unauthorised",
        },
        401
      );
    }

    const { results } = await c.env.DB.prepare(
      "SELECT * FROM event WHERE referrer like '%google%' AND type = ? AND DATE(timestamp) = CURRENT_DATE;"
    )
      .bind(event)
      .all();

    return c.json({
      length: results.length,
      data: results,
    });
  } catch (error) {
    console.log("error", error);
    return c.json(
      {
        message: "Server Error",
      },
      500
    );
  }
};

export default getTodayEvent;
