import { fail, type Actions, redirect } from "@sveltejs/kit";
import { prisma } from "lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  const latest = await prisma.post.findMany({
    take: 10,
    where: {
      userId: session?.user.userId,
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  if (!latest) throw redirect(303, "/error");
  
  const latestComments = await prisma.comment.findMany({
    take: 10,
    where: {
      userId: session?.user.userId,
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  console.log(session?.user);

  if (!latestComments) throw redirect(303, "/error");

  return {
    latest,
    latestComments
  }
}

export const actions: Actions = {
  upload: async ({ locals: { supabase, auth }, request }) => {
    const data = await request.formData();
    const image = data.get("image") as File;
    if (!image) {
      return fail(400, {
        error: true,
        message: 'You must provide an image'
      });
    } 
    const img_ext = image?.name.split('.').pop();

    if (img_ext === undefined) {
      return fail(400, {
        error: true,
        message: 'You must provide an image file'
      });
    }

    const user = await auth.validate();
    const new_image_name = user.user.userId + '.' + img_ext;
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(img_ext)) {
      return fail(400, {
        error: true,
        message: 'You must provide a valid image file'
      });
    }

    const newImage = await image.arrayBuffer();

    const { error } = await supabase.storage
      .from('social-platform')
      .upload(`images/${new_image_name}`, newImage, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.log(error);
      return fail(500, {
        error: true,
        message: 'Error uploading image'
      });
  }

    await prisma.user.update({
      where: {
        id: user.user.userId
      },
      data: {
        profilePicture: new_image_name
      }
    })
  } 
}
