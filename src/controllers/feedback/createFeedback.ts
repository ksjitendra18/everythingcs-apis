import { Context } from "hono";
import { query } from "../../db/schema/query";
import { drizzle } from "drizzle-orm/d1";

import { customAlphabet } from "nanoid";
import { feedback } from "../../db/schema/feedback";

const createFeedback = async (c: Context) => {
  const SECRET_KEY = c.env.TURNSTILE_SECRET;

  const { message, rating, cfTurnstileRes } = await c.req.json();

  const db = drizzle(c.env.DB);
  const ip = c.req.header("CF-Connecting-IP");

  if (!rating) {
    return c.json(
      {
        error: "missing_field",
        message: "Rating is required",
      },
      400
    );
  }

  if (!cfTurnstileRes) {
    return c.json(
      {
        error: "captcha_error",
        message: "Error with captcha. Please refresh and try again",
      },
      400
    );
  }

  let formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", cfTurnstileRes);
  formData.append("remoteip", ip!);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome: any = await result.json();

  console.log("outcome", outcome);
  if (!outcome.success) {
    return c.json(
      {
        error: "captcha_error",
        message: "Error with captcha. Please refresh and try again",
      },
      400
    );
  }

  // const id = nanoid();

  try {
    const newFeedback = await db.insert(feedback).values({
      message,
      rating,
      ip: ip ?? "dev",
    });

    if (newFeedback.error) {
      return c.json(
        {
          error: "server_error",
          message: "Server Error",
        },
        500
      );
    }
    return c.json(
      {
        data: {
          submit: true,
          message: `Feedback Submitted successfully`,
        },
      },
      201
    );
  } catch (error) {
    console.log("err", error);
    return c.json(
      {
        error: "server_error",
        message: "Server Error",
      },
      500
    );
  }
};

export default createFeedback;
