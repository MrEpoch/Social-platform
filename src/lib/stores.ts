import { writable, type Writable } from "svelte/store";
import type { PostWithUser } from "types";

export const posts: Writable<PostWithUser[]> = writable([]);
export const comments: Writable<any> = writable({});
