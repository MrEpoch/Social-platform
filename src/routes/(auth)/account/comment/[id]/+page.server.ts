import { getComment } from "lib/comments";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const commentId = params.id;
  const comment = await getComment(commentId);

  if (!comment || !comment?.user) {
    throw redirect(302, '/account');
  }

  return {
    comment
  }
}
