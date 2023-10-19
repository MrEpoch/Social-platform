import type { Post } from "@prisma/client";

export interface PostWithUser extends Post {
  user: {
    username: string;
    profilePicture: string;
    lastActive: Date;
  };
}
