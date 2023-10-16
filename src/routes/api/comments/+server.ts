import { json } from "@sveltejs/kit";
import { getComments } from "lib/comments";

export async function POST({ request }) {
  const data = await request.json();

  console.log(data);
  const take = data.take;
  const skip = data.skip;
  const postId = data.postid;
  if (!take) {
    return json({ error: true, type: "take" });
  } else if (skip === null) {
    return json({ error: true, type: "skip" });
  }

  const comments = await getComments(String(postId), parseInt(take), parseInt(skip));

  return json({ comments });
}
