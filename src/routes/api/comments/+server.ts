import type { SupabaseClient } from "@supabase/supabase-js";
import { json, redirect } from "@sveltejs/kit";
import { getComments } from "lib/comments";
import type { CommentWithUser } from "types";

export async function POST({ request, locals: { supabase } }: { request: Request; locals: { supabase: SupabaseClient } }) {
  const data = await request.json();

  const take = data.take;
  const skip = data.skip;
  const postId = data.postid;
  if (!take) {
    return json({ error: true, type: "take" });
  } else if (skip === null) {
    return json({ error: true, type: "skip" });
  }

  const comments = await getComments(String(postId), parseInt(take), parseInt(skip));

  if (!comments) throw redirect(303, "/error");

  const commentsUserPicture = await Promise.all(
    comments.map(async (comment: CommentWithUser) => {
      const { data } = supabase.storage
        .from('social-platform')
        .getPublicUrl(`images/${comment.user.profilePicture}`);
      comment.user.profilePicture = data.publicUrl;
      return comment;
  }))

  return json({ comments: commentsUserPicture });
}
