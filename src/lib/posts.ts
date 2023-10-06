import { prisma } from "./db"

export const getPosts = async (type: "latest" | "popular" | "random") => {
  if (type === "random") {
    return await prisma.post.findMany({
      orderBy: {
        id: "asc"
      }
    })
  } else if (type === "popular") {
    return await prisma.post.findMany({
      orderBy: {
        likeCount: "desc"
      }
    })
  } else {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}
