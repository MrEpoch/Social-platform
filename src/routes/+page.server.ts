import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createPost, getPost, getPosts, likePost, unlikePost } from "lib/posts";
import { z } from "zod";
import { createComment } from "lib/comments";
import { UploadSupabase } from "lib/storage";
import type { User } from "lucia";
import { wait } from "lib";
import type { PostWithUser } from "types";

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const params_data = url.searchParams.get("type") || "latest" as "latest" | "popular" | "random";
  const feeds_pre = await getPosts(params_data as "latest" | "popular" | "random", 25, 0);
  if (!feeds_pre || feeds_pre?.error) {
    return {
      error: true,
      type: "getPosts"
    }
  }

  const feedsUserPicture = await Promise.all(
    feeds_pre.map(async (feed: PostWithUser) => {
      const { data } = await supabase.storage
        .from('social-platform')
        .getPublicUrl(`images/${feed.user.profilePicture}`);
      feed.user.profilePicture = data.publicUrl;
  }))

  const feeds = await Promise.all(
    feedsUserPicture.map(async (feed: PostWithUser) => {
      feed.images.forEach(async (image, i) => {
			const { data } = await supabase.storage
				.from('social-platform')
				.getPublicUrl(`images/${image}`);
      feed.images[i] = data.publicUrl;
      return image;
    })
    return feed;
  }));
  return {
    feeds,
    params_data
  }
}

export const actions: Actions = {
  like: async ({ request, locals, cookies }) => {
    try {
    const data = await request.formData(); 
    const session = await locals.auth.validate();

    if (!session) throw redirect(303, "/signin");

    const normal_post_id = z.string().min(3);
    const post_id = normal_post_id.safeParse(data.get("post_id"));

    let load_speed = 0;
		const slower = cookies.get('slower');
		if (slower) {
			load_speed = JSON.parse(slower);
		}
		cookies.set('slower', JSON.stringify(load_speed + 0.05), {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 12
		});

		await wait(load_speed * 1000);

    if (!post_id.success) {
      return {
        error: true,
        type: "like"
      }
    }

    const post = await getPost(post_id.data) as Post;
    if (post?.error) {
      return {
        error: true,
        type: "like"
      }
    }

    const user = session.user as User;

    if (post && user && user.likedPostsId.includes(post.id)) {
      await unlikePost(post.id, user.userId);
    } else {
      await likePost(post.id, user.userId);
    }
    } catch (error) {
        console.log(error);
        return fail(400, {
          error: true,
          type: "like"
        })
    }
  },

  comment: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth.validate();

    if (!session) throw redirect(303, "/signin");

    const normal_comment = z.string().min(3);
    const comment_content = normal_comment.safeParse(data.get("comment"));
    const post_id = normal_comment.safeParse(data.get("post_id"));

    if (!comment_content.success) {
      return fail(400, {
        error: true,
        type: "comment"
      })
    } else if (!post_id.success) {
      return fail(400, {
        error: true,
        type: "comment"
      })
    }

    console.log(comment_content.data, post_id.data);

    const newComment = await createComment(post_id.data, session.user.userId, comment_content.data);

    return fail(400, {
      error: false,
      newComment
    })
  },

  newPost: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth.validate();

    if (!session) {
      throw redirect(303, "/signin");
    }

    const normal_post = z.string().min(3);

    const post_content = normal_post.safeParse(data.get("post_content"));
    const post_images = data.get("post_images") as File;
    const post_images_2 = data.get("post_images_2") as File;

    const images = [];

    if (post_images) {
      const img1 = await UploadSupabase(post_images, locals.supabase);
      if (typeof img1 !== "string" && img1?.error) {
        return fail(400, {
          error: true,
          type: "Image 1 upload"
        })
      }
      typeof img1 === "string" && images.push(img1);
    }
    if (post_images_2) {
      const img1 = await UploadSupabase(post_images, locals.supabase);
      if (typeof img1 !== "string" && img1?.error) {
        return fail(400, {
          error: true,
          type: "Image 2 upload"
        })
      }
      typeof img1 === "string" && images.push(img1);
    }

    if (!post_content.success) {
      return fail(400, {
        error: true,
        type: "newPost"
      })
    }

    console.log(session);
    const newPost = await createPost(session.user.userId, post_content.data, images);

    return fail(400, {
      error: false,
      newPost
    })
  }
}
