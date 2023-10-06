import { prisma } from "./db"

export const getComments = async (type: "latest" | "popular" | "random") => {
  const orderByValue = {
    latest: {
      createdAt: "desc"
    },
    popular: {
      likes: "desc"
    },
    random: {
      id: "asc"
    }
  }

  if (type === "random") {
    return await prisma.comment.findMany({
      orderBy: {
        id: "asc"
      }
    })
  } else if (type === "popular") {
    return await prisma.comment.findMany({
      orderBy: {
        likes: "desc"
      }
    })
  } else {
    return await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}
