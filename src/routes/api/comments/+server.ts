import { json, redirect } from "@sveltejs/kit";
import { getPost } from "lib/posts";

export default async function GET({ request, locals, searchParams }) {
  const postId = searchParams.get("postid");

  if (!postId) {
    throw redirect(303, "/?error=comment");
  }

  const post = await getPost(postId);

  if (post?.error) {
    throw redirect(303, "/?error=comment");
  }

  return json({ post });
}
