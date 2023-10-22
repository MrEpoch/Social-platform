import { getComment } from "lib/comments";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  const commentId = params.id;
  const comment = await getComment(commentId);

  if (!comment || !comment?.user) {
    throw redirect(302, '/account');
  }

  const { data } = await locals.supabase.storage
        .from('social-platform')
        .getPublicUrl(`images/${comment.user.profilePicture}`);
      comment.user.profilePicture = data.publicUrl;
  if (typeof comment === "boolean") throw redirect(302, '/account');

  return {
    comment
  }
}
