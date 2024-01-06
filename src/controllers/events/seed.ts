import { Context } from "hono";
import { event } from "../../db/schema/event";
import { query } from "../../db/schema/query";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { UAParser } from "ua-parser-js";
// import { data } from "../../data";

const seedEvents = async (c: Context) => {
  const db = drizzle(c.env.DB);
  const data = [];

  try {
    for (let i = 2002; i < data.length; i++) {
      const ev = data[i];

      const newEvent = await db.insert(event).values({
        id: ev.id,
        type: ev.type,
        slug: ev.slug,
        country: ev.country,
        ip: ev.ip,
        browser: ev.browser,
        referrer: ev.referrer,
        os: ev.referrer,
        timestamp: ev.timestamp,
      });

      if (newEvent.error) {
        console.log("error", newEvent.error);
        return c.json(
          {
            message: "Unable to submit. Please try later",
          },
          400
        );
      }
    }

    return c.json({
      success: true,
      data: {
        submit: true,
      },
    });
  } catch (error) {
    console.log("err", error);
    return c.json(
      {
        message: "Server Error",
      },
      500
    );
  }
};

export default seedEvents;
