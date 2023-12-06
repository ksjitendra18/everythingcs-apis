import { Context } from "hono";
import { event } from "../../db/schema/event";
import { query } from "../../db/schema/query";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { UAParser } from "ua-parser-js";

const createEvent = async (c: Context) => {
  const { type, device, slug, referrer } = await c.req.json();

  const db = drizzle(c.env.DB);
  const ip = c.req.header("CF-Connecting-IP") ?? "dev";
  const country = c.req.header("CF-IPCountry") ?? "dev";

  if (!type) {
    return c.json(
      {
        message: "Type is required",
      },
      400
    );
  }

  if (!device) {
    return c.json(
      {
        message: "Device is required",
      },
      400
    );
  }

  const parser = new UAParser(device);

  const regexPattern = /^49\.36\./;
  if (regexPattern.test(ip)) {
    return c.json(
      {
        message: "Device is required",
      },
      400
    );
  }
  try {
    const newEvent = await db.insert(event).values({
      type,
      slug,
      country: country,
      ip: ip,
      browser: parser.getBrowser().name + " " + parser.getBrowser().version,
      os: parser.getOS().name ?? "dev" + " " + parser.getOS().version ?? "dev",
      referrer,
    });
    if (newEvent.error) {
      return c.json(
        {
          message: "Unable to submit. Please try later",
        },
        400
      );
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

export default createEvent;
