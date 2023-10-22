import type { SupabaseClient } from "@supabase/supabase-js";
import { json, redirect } from "@sveltejs/kit";
import { getPosts } from "lib/posts";
import type { PostWithUser } from "types";

export async function POST({ request, locals: { supabase } }: { request: Request, locals: { supabase: SupabaseClient } }) {
  const data = await request.json();

  const type = data.type;
  const take = data.take;
  const skip = data.skip;
  if (!type) {
    return json({ error: true, type: "type" });
  } else if (!take) {
    return json({ error: true, type: "take" });
  } else if (!skip) {
    return json({ error: true, type: "skip" });
  }

  const posts = await getPosts(data.type, parseInt(take), parseInt(skip));

  if (!posts) throw redirect(303, "/error");
  console.log(posts);

  const postsUserPicture = await Promise.all(
    posts.map(async (post: PostWithUser) => {
      const { data } = supabase.storage
        .from('social-platform')
        .getPublicUrl(`images/${post.user.profilePicture}`);
      post.user.profilePicture = data.publicUrl;
      return post;
  }))


  const postsWithImages = await Promise.all(
    postsUserPicture.map(async (post: PostWithUser) => {
      post.images.forEach(async (image: string, i: number) => {
			const { data } = supabase.storage
				.from('social-platform')
				.getPublicUrl(`images/${image}`);
      post.images[i] = data.publicUrl;
      return image;
    })
    return post;
  }));

  return json({ posts: postsWithImages });
}
