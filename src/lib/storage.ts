import type { SupabaseClient } from "@supabase/supabase-js";

export async function UploadSupabase(post_images: File, supabase: SupabaseClient) {
  try {
      const img_ext = post_images?.name.split('.').pop();
			if (img_ext === undefined) {
				return {
					error: true,
					message: 'You must provide an image file'
				}
			}
			const new_image_name = Math.random().toString(36).substring(2, 15) + '.' + img_ext;

			const newImage = await post_images.arrayBuffer();

			const { error } = await supabase.storage
				.from('social-platform')
				.upload(`images/${new_image_name}`, newImage, {
					cacheControl: '3600'
        });
      console.log(error);
      return new_image_name;
  } catch (error) {
      console.log(error);
      return {
        error: true,
        type: "unknown"
      }
  }
}
