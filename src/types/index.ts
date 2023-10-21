import type { Comment, Post, User } from "@prisma/client";

export interface PostWithUser extends Post {
  user: User
}

export interface CommentWithUser extends Comment {
  user: User
}
