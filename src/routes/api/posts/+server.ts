import { json } from "@sveltejs/kit";
import { getPosts } from "lib/posts";

export async function POST({ request }) {
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

  return json({ posts });
}
