import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createPost, getPosts } from "lib/posts";
import { z } from "zod";

export const load: PageServerLoad = ({ url }) => {
  const params_data = url.searchParams.get("type") || "latest" as "latest" | "popular" | "random";
  const feeds = getPosts(params_data as "latest" | "popular" | "random", 25, 0);

  return {
    feeds,
    params_data
  }
}

export const actions: Actions = {
  like: async ({ request }) => {
    
  },

  comment: async ({ request }) => {
    const data = await request.formData();
  },

  newPost: async ({ request }) => {
    const data = await request.formData();

    const normal_comment = z.string().min(3);

    const post_content = normal_comment.safeParse(data.get("post_content"));

    if (!post_content.success) {
      return {
        error: true,
        type: "newPost"
      }
    }

    const newPost = await createPost(data.get("post_content"));
  }
}
