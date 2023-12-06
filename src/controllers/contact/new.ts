import { Context } from "hono";
import { query } from "../../db/schema/query";
import { drizzle } from "drizzle-orm/d1";

const SECRET_KEY = "0x4AAAAAAAHq81vCSE7YC5uHKE9mq8rMFTM";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);
const createContact = async (c: Context) => {
  const { name, email, type, blogPostLink, message, cfTurnstileRes } =
    await c.req.json();

  const db = drizzle(c.env.DB);
  const ip = c.req.header("CF-Connecting-IP");

  if (!name) {
    return c.json(
      {
        error: "missing_field",
        message: "Name is required",
      },
      400
    );
  }

  if (!email) {
    return c.json(
      {
        error: "missing_field",
        message: "Email is required",
      },
      400
    );
  }

  if (!type) {
    return c.json(
      {
        error: "missing_field",
        message: "Reason is required",
      },
      400
    );
  }
  if (!message) {
    return c.json(
      {
        error: "missing_field",
        message: "Please enter message",
      },
      400
    );
  }

  if (type === "blog" || type === "dmca") {
    if (!blogPostLink) {
      return c.json(
        {
          error: "missing_field",
          message: "Blog Post Link is required",
        },
        400
      );
    }
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

  const id = nanoid();

  try {
    if (type === "blog" || type === "dmca") {
      const newQuery = await db.insert(query).values({
        id,
        name,
        email,
        message,
        blogPostLink,
        type,
        ip: ip ?? "dev",
      });

      if (newQuery.error) {
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
            message: `Form Submitted successfully. Reference id: ${id}`,
            referenceId: id,
          },
        },
        201
      );
    }

    const newQuery = await db.insert(query).values({
      name,
      email,
      message,
      type,
      ip: ip ?? "dev",
    });
    if (newQuery.error) {
      return c.json(
        {
          error: "server_error",
          message: "Unable to submit. Please try later",
        },
        500
      );
    }
    return c.json(
      {
        success: true,
        data: {
          submit: true,
          message: `Form Submitted successfully. Reference id: ${id}`,
          referenceId: id,
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

export default createContact;
