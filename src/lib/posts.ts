import { prisma } from "./db"

export const getPosts = async (type: "latest" | "popular" | "random", loadMore = 50, skip=0) => {
  try {
    if (type === "random") {
      return await prisma.post.findMany({
        orderBy: {
          id: "asc",
        },
        take: loadMore,
        skip: skip
      })
    } else if (type === "popular") {
      return await prisma.post.findMany({
        orderBy: {
          likeCount: "desc"
        },
        take: loadMore,
        skip: skip
      })
    } else {
      return await prisma.post.findMany({
        orderBy: {
          createdAt: "desc"
        },
        take: loadMore,
        skip: skip
      })
    }
  } catch (error) {
      console.log(error)
      return {
        error: true,
        type: "getPosts"
      }
  }
}

export const createPost = async (
  userId: string,
  content: string,
  images: string[]
) => {
  try {
    return await prisma.post.create({
      data: {
        userId,
        content,
        images
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "createPost"
    }
  }
}

export const updatePost = async (
  postId: string,
  userId: string,
  content: string,
  images: string[]
) => {
  try {
    return await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        userId,
        content,
        images
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "updatePost"
    }
  }
}

export const deletePost = async (postId: string, userId: string) => {
  try {
    return await prisma.post.delete({
      where: {
        userId_id: {
          id: postId,
          userId
        }
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "deletePost"
    }
  }
}
