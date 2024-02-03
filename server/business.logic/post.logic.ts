import { Prisma } from "@prisma/client";
import { prisma } from "../config";
import { NotFound } from "http-errors";
type CREATE_POST_TYPE = {
  userId: string;
  input: Prisma.PostCreateInput;
};

type Ids = {
  userId?: string;
  postId?: string;
};
type UPDATE_TYPE = {
  userId: string;
  postId: string;
  input: Prisma.PostUpdateInput;
};

interface getOptions {
  skip?: number;
  take?: number;
  search?: string;
}

export const PostLogic = {
  async createPost({ userId, input }: CREATE_POST_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { caption } = input;

        const isUserExist = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (!isUserExist) throw new NotFound("User not found");
        const create = await prisma.post.create({
          data: {
            caption,

            userId,
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
  async deletePost({ userId, postId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isPOstExist = await prisma.post.findUnique({
          where: {
            id: postId,
            userId,
          },
        });

        if (!isPOstExist)
          throw new NotFound("Post not found , Please add post ");
        const deletePost = await prisma.post.delete({
          where: {
            id: postId,
            userId,
          },
        });
        return resolve(deletePost);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAllPosts(input: getOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const { skip, search, take } = input;
        const skipItems = Number(take) * Number((skip as number) - 1);
        const skipLimit = {};
        if (Number(skip) && Number(take))
          Object.assign(skipLimit, { skip: skipItems, take: Number(take) });
        const posts = await prisma.post.findMany({
          ...skipLimit,
          where: {
            caption: {
              contains: search,
              mode: "insensitive",
            },
          },
          include: {
            Comment: true,
          },
        });

        if (!posts.length) throw new NotFound("No posts found");
        const pagination = {
          skip: Number(take) * Number((skip as number) - 1),
          take: Number(take),
        };
        return resolve({ posts, pagination });
      } catch (error) {
        reject(error);
      }
    });
  },
  async getPostById({ postId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isPostExist = await prisma.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            Comment: true,
          },
        });
        if (!isPostExist) throw new NotFound("Post not found");
        return resolve(isPostExist);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updatePost({ userId, postId, input }: UPDATE_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { caption } = input;
        const isPOstExist = await prisma.post.findUnique({
          where: {
            id: postId,
            userId,
          },
        });
        if (!isPOstExist) throw new NotFound("Post not found");
        const update = await prisma.post.update({
          where: {
            id: postId,
            userId,
          },
          data: {
            caption,
          },
        });
        return resolve(update);
      } catch (error) {
        reject(error);
      }
    });
  },
};
