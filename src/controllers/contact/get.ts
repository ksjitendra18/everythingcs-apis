import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { query } from "../../db/schema/query";
import { eq } from "drizzle-orm";

const getAllContacts = async (c: Context) => {
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

    const allQueries = await db.select().from(query);

    return c.json({
      length: allQueries.length,
      data: allQueries,
    });
  } catch (error) {
    return c.json(
      {
        message: "Server Error",
      },
      500
    );
  }
};

export default getAllContacts;
