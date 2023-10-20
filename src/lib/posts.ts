import { prisma } from "./db"

export const getPost = async (postId: string) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: postId
      },
      select: {
          id: true,
          content: true,
          images: true,
          user: true,
          likeCount: true,
      }
    })
  } catch (error) {
      console.log(error)
      return {
        error: true,
        type: "getPost"
      }
  }
}

export const getPosts = async (type: "latest" | "popular" | "random", loadMore = 50, skip=0) => {
  try {
    if (type === "random") {
      return await prisma.post.findMany({
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          content: true,
          images: true,
          user: true,
          likeCount: true,
        },
        take: loadMore,
        skip: skip
      })
    } else if (type === "popular") {
      return await prisma.post.findMany({
        orderBy: {
          likeCount: "desc"
        },
        select: {
          id: true,
          content: true,
          images: true,
          user: true,
          likeCount: true,
        },
        take: loadMore,
        skip: skip
      })
    } else {
      return await prisma.post.findMany({
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          content: true,
          images: true,
          user: true,
          likeCount: true,
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

export const unlikePost = async (postId: string, userId: string) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likeCount: {
          decrement: 1
        },
        likedBy: {
          disconnect: {
            id: userId
          }
        }
      },
    })
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        likedPosts: {
          disconnect: {
            id: postId
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "unlikePost"
    }
  }
}

export const likePost = async (postId: string, userId: string) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likeCount: {
          increment: 1
        },
        likedBy: {
          connect: {
            id: userId
          }
        }
      }
    })
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        likedPosts: {
          connect: {
            id: postId
          }
        },
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "likePost"
    }
  }
}
