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

export const POST: RequestHandler = async ({
  request,
  params,
  cookies,
  locals,
}) => {
  try {
    const formName = params.slug as LoginType;
    if (!formName) {
      return json({ error: "invalid request" });
    }

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
        return json({ formError: { password: "Incorrect password" } });
      }
    } else if (formName === "register") {
      // TODO: Register logic
    } else if (formName === "logout") {
      if (locals.user) {
        // TODO: Logout logic
        return json({ message: "Logout successful." });
      } else {
        return json({ error: "User already logged out." });
      }
    }
  } catch (err) {
    console.log("auth error:", err);
  } finally {
    await mongoClient.close();
  }

  return json({ error: `unknown auth error` });
};
