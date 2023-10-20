import type { PageServerLoad } from "./$types";
import { getPost } from "lib/posts";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const postId = params.id;
  const post = await getPost(postId);

  const { data } = await supabase.storage
        .from('social-platform')
        .getPublicUrl(`images/${post.user.profilePicture}`);
      post.user.profilePicture = data.publicUrl;

  return {
    post
  }
}
