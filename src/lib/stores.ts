import type { Post } from "@prisma/client";
import { writable, type Writable } from "svelte/store";

export const posts: Writable<Post[]> = writable([]);
