import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as db } from "./db";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
	adapter: prisma(db, {
		user: "user", // model User {}
		key: "key", // model Key {}
		session: "session" // model Session {}
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username
    }
  }
})
