import type { Comment, Post } from "@prisma/client";
import { writable, type Writable } from "svelte/store";

export const posts: Writable<Post[]> = writable([]);
export const comments: Writable<Comment[]> = writable([]);
