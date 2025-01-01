import {
  loginSchema,
  registerSchema,
  type RegisterSchema,
} from "$lib/schemas/AuthSchema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { JWT_SECRET } from "$env/static/private";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users, mongoClient } from "$lib/server/mongodb";
import { type LoginType } from "$lib/types/auth/LoginType";

export const prerender = false;

export const POST: RequestHandler = async ({ request, url, cookies }) => {
  const formName = url?.searchParams?.get("formName") as LoginType;

  if (!formName) {
    return json({ error: "null form name" });
  }

  try {
    const data = (await request.json()) as RegisterSchema;
    const validationResult =
      formName === "login"
        ? loginSchema.safeParse(data)
        : registerSchema.safeParse(data);

    if (!validationResult.success) {
      return json({ error: "form not valid. hmmm..." });
    }

    // parsed form is valid
    // now validate server-specific errors

    if (formName === "login") {
      await mongoClient.connect();
      const user = await users.findOne({ email: data.email });

      if (user === null) {
        return json({ formError: { email: "We couldn't find your email :(" } });
      }

      if (await bcrypt.compare(data.password, user.password)) {
        // Create JWT with user id
        const token = jwt.sign(user._id.toString(), JWT_SECRET);

        cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 2592000, // 30 days
        });

        return json({ success: true });
      } else {
        return json({ formError: { password: "incorrect password" } });
      }
    } else if (formName === "register") {
      // TODO: Register logic
    } else if (formName === "logout") {
      // TODO: Logout logic
    }
  } catch (err) {
    console.log("server form error:", err);
  } finally {
    await mongoClient.close();
  }

  return json({ error: `unknown ${formName} form error` });
};
