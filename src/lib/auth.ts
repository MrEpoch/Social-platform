import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as db } from "./db";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
	adapter: prisma(db),
  getUserAttributes: (data: any) => {
    return {
      username: data.username,
      likedPostsId: data.likedPostsId,
      profilePicture: data.profilePicture
    }
  }
})
