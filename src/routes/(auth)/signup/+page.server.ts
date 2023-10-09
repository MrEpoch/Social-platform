import { fail, type Actions, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { auth } from "lib/auth";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    try {
      const data = await request.formData();

      const normalUsername = z.string().min(5);
      const normalPassword = z.string().min(8);

      const username = normalUsername.safeParse(data.get("username"));
      const password = normalPassword.safeParse(data.get("password"));

      if (!username.success) {
        return fail(400, {
          type: "username",
          error: true
        })
      } else if (!password.success) {
        return fail(400, {
          type: "password",
          error: true
        })
      }

      const user = await auth.createUser({
        key: {
          providerId: "username",
          providerUserId: username.data.toLowerCase(),
          password: password.data
        },
        attributes: {
          username: username.data
        }
      });

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });

      locals.auth.setSession(session);
    } catch (error) {
        console.log(error)
        return fail(400, {
          type: "unknown",
          error: true
        })
    }

    throw redirect(303, "/account");
  }
}
