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
    return false; 
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
      return false;
  }
}

export const createPost = async (
  userId: string,
  content: string,
  images: string[]
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const post = await prisma.post.create({
      data: {
        userId,
        content,
        images
      }
    })
    return post;
  } catch (error) {
    console.log(error)
    return false;
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
    return false;
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
    return false;
  }
}

export const unlikePost = async (postId: string, userId: string) => {
  try {
    await prisma.post.update({
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
    await prisma.user.update({
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
    return false;
  }
}

export const likePost = async (postId: string, userId: string) => {
  try {
    await prisma.post.update({
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
    await prisma.user.update({
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
    return false;
  }
}
