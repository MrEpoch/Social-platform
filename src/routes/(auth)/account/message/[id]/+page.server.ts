import type { PageServerLoad } from "./$types";
import { getPost } from "lib/posts";

export const load: PageServerLoad = async ({ params }) => {
  const postId = params.id;
  const post = await getPost(postId);
 
  return {
    post
  }
}
