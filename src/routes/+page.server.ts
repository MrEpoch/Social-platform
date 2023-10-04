import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {

  const temp = [
    {
      content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      images: ["https://picsum.photos/200/300"]
    }
  ]

  return {
    feeds: temp
  }
}
