import { RequestHandler } from "express";
import { PostLogic } from "../business.logic/post.logic";

export const PostController: {
  createPost: RequestHandler;
  deletePost: RequestHandler;
  updatePost: RequestHandler;
  getPostById: RequestHandler;
  getAllPosts: RequestHandler;
} = {
  async createPost(req, res, next) {
    try {
      const userId = req.currentUser?.id as string;
      console.log(userId);
      const input = req.body;
      const response = await PostLogic.createPost({ userId, input });
      res.json({
        success: true,
        message: "Post created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deletePost(req, res, next) {
    try {
      const userId = req.currentUser?.id as string;
      const postId = req.params.id;
      const response = await PostLogic.deletePost({ userId, postId });
      res.json({
        success: true,
        message: "Post deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async updatePost(req, res, next) {
    try {
      const postId = req.params.id;
      const userId = req.currentUser?.id as string;
      const input = req.body;
      const response = await PostLogic.updatePost({ userId, postId, input });
      res.json({
        success: true,
        message: "Post updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getPostById(req, res, next) {
    try {
      const postId = req.params.id;
      console.log(postId);
      const response = await PostLogic.getPostById({ postId });
      res.json({
        success: true,
        message: "Post fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllPosts(req, res, next) {
    try {
      const input = req.query;
      const response = await PostLogic.getAllPosts(input);
      res.json({
        success: true,
        message: "Posts fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};
