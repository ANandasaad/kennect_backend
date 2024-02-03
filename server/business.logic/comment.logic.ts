import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound } from "http-errors";
type COMMENT_TYPE = {
  userId: string;
  input: Prisma.CommentUncheckedCreateInput;
};
type Ids = {
  userId?: string;
  postId?: string;
  commentId?: string;
};

type getOptions = {
  skip?: number;
  take?: number;
  search?: string;
};

type UPDATE_TYPE = {
  commentId: string;
  userId: string;
  input: Prisma.CommentUpdateInput;
};

export const CommentLogic = {
  async createComment({ userId, input }: COMMENT_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { message, postId } = input;
        const isPostExist = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
        if (!isPostExist) throw new NotFound("Post not found");
        const create = await prisma.comment.create({
          data: {
            message,
            userId,
            postId,
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        });
        return resolve(create);
      } catch (error) {
        reject(error);
      }
    });
  },
  async deleteComment({ userId, postId, commentId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isPostExist = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
        if (!isPostExist) throw new NotFound("Post not found");
        const isCommentExist = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
        });
        if (!isCommentExist) throw new NotFound("Comment not found");
        const deleteComment = await prisma.comment.delete({
          where: {
            id: commentId,
            userId,
            postId,
          },
        });
        return resolve(deleteComment);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateComment({ commentId, userId, input }: UPDATE_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { message } = input;
        const isCommentExist = await prisma.comment.findUnique({
          where: {
            id: commentId,
            userId,
          },
        });
        if (!isCommentExist) throw new NotFound("Comment not found");
        const update = await prisma.comment.update({
          where: {
            id: commentId,
            userId,
          },
          data: {
            message,
          },
        });

        return resolve(update);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getCommentById({ commentId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isCommentExist = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
        });
        if (!isCommentExist) throw new NotFound("Comment not found");
        return resolve(isCommentExist);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAllComments(input: getOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const { skip, search, take } = input;
        const skipItems = Number(take) * Number((skip as number) - 1);
        const skipLimit = {};
        if (Number(skip) && Number(take))
          Object.assign(skipLimit, { skip: skipItems, take: Number(take) });
        const getAllComments = await prisma.comment.findMany({
          ...skipLimit,
          where: {
            message: {
              contains: search,
              mode: "insensitive",
            },
          },
        });
        if (!getAllComments.length) throw new NotFound("No comments found");
        const pagination = {
          skip: Number(take) * Number((skip as number) - 1),
          take: Number(take),
        };
        return resolve({ getAllComments, pagination });
      } catch (error) {
        reject(error);
      }
    });
  },
};
