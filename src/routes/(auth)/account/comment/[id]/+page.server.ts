import { getComment } from "lib/comments";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const commentId = params.id;
  const comment = await getComment(commentId);

  return {
    comment
  }
}
