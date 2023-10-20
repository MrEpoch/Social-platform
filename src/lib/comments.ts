import { prisma } from "./db"

export const getComment = async (commentId: string) => {
  try {
    return await prisma.comment.findUnique({
      where: {
        id: commentId
      }
    })
  } catch (error) {
    console.log(error)
    return false;
  }
}

export const getComments = async (postId: string, loadMore=50, skip=0) => {
  try {
    return await prisma.comment.findMany({
      where: {
        postId
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: loadMore,
      skip: skip
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "getComments"
    }
  }
}

export const getCommentCount = async (postId: string) => {
  try {
    return await prisma.comment.count({
      where: {
        postId
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "getCommentCount"
    }
  }
}

export const createComment = async (
  postId: string,
  userId: string,
  content: string
  ) => {
  try {
    return await prisma.comment.create({
      data: {
        postId,
        userId,
        content
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "createComment"
    }
  }
}

export const updateComment = async (
  commentId: string,
  postId: string,
  userId: string,
  content: string
) => {
  try {
    return await prisma.comment.update({
      where: {
        userId_id_postId: {
          id: commentId,
          postId,
          userId
        }
      },
      data: {
        content
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "updateComment"
    }
  }
}

export const deleteComment = async (commentId: string, userId: string, postId: string) => {
  try {
    return await prisma.comment.delete({
      where: {
        userId_id_postId: {
          id: commentId,
          postId,
          userId
        }
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: true,
      type: "deleteComment"
    }
  } 
}
