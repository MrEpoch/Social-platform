import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createPost, getPosts } from "lib/posts";
import { z } from "zod";
import { createComment } from "lib/comments";

export const load: PageServerLoad = ({ url }) => {
  const params_data = url.searchParams.get("type") || "latest" as "latest" | "popular" | "random";
  const feeds = getPosts(params_data as "latest" | "popular" | "random", 25, 0);

  return {
    feeds,
    params_data
  }
}

export const actions: Actions = {
  like: async ({ request, locals }) => {
    const data = await request.formData(); 
    const session = await locals.auth.validate();

    if (!session) throw redirect(303, "/signin");

    const normal_post_id = z.string().min(3);
    const post_id = normal_post_id.safeParse(data.get("post_id"));

    if (!post_id.success) {
      return {
        error: true,
        type: "like"
      }
    }
  },

  comment: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth.validate();

    if (!session) throw redirect(303, "/signin");

    const normal_comment = z.string().min(3);
    const comment_content = normal_comment.safeParse(data.get("comment_content"));
    const post_id = normal_comment.safeParse(data.get("post_id"));

    if (!comment_content.success) {
      return {
        error: true,
        type: "comment"
      }
    } else if (!post_id.success) {
      return {
        error: true,
        type: "comment"
      }
    }

    const newComment = await createComment(session.user.id, post_id.data, comment_content.data);

    return {
      error: false,
      newComment
    }
  },

  newPost: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth.validate();

    if (!session) {
      throw redirect(303, "/signin");
    }

    const normal_post = z.string().min(3);

    const post_content = normal_post.safeParse(data.get("post_content"));

    if (!post_content.success) {
      return {
        error: true,
        type: "newPost"
      }
    }

    const newPost = await createPost(session.user.id, post_content.data, [""]);

    return {
      error: false,
      newPost
    }
  }
}
