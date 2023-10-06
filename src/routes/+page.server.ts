import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {

  const params_data = url.searchParams.get("type") || "latest";
  console.log(params_data)
  const temp = [
    {
      content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      images: ["https://picsum.photos/200/300"],
      user: {
        name: "Alex",
        image: "https://picsum.photos/200/300",
        lastActive: new Date().toISOString().split("T")[0]
      },
      isLiked: true
    }
  ]

  return {
    feeds: temp,
    params_data
  }
}

export const actions: Actions = {
  like: async ({ request }) => {
    
  },

  comment: async ({ request }) => {
    const data = await request.formData();
  }
}
