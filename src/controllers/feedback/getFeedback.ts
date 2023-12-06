import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { query } from "../../db/schema/query";
import { eq } from "drizzle-orm";
import { feedback } from "../../db/schema/feedback";

const getAllFeedbacks = async (c: Context) => {
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

    const allFeedbacks = await db.select().from(feedback);

    return c.json({
      length: allFeedbacks.length,
      data: allFeedbacks,
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

export default getAllFeedbacks;
