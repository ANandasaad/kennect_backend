import { RequestHandler } from "express";
import { CommentLogic } from "../business.logic/comment.logic";

export const CommentController: {
  createComment: RequestHandler;
  deleteComment: RequestHandler;
  updateComment: RequestHandler;
  getAllCOmments: RequestHandler;
  getCommentBYId: RequestHandler;
} = {
  async createComment(req, res, next) {
    try {
      const userId = req.currentUser?.id as string;
      const input = req.body;
      const response = await CommentLogic.createComment({ userId, input });
      res.json({
        success: true,
        message: "Comment created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteComment(req, res, next) {
    try {
      const userId = req.currentUser?.id as string;
      const { postId, commentId } = req.params;
      const response = await CommentLogic.deleteComment({
        userId,
        postId,
        commentId,
      });
      res.json({
        success: true,
        message: "Comment deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllCOmments(req, res, next) {
    try {
      const input = req.query;
      const response = await CommentLogic.getAllComments(input);
      res.json({
        success: true,
        message: "Comments retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCommentBYId(req, res, next) {
    try {
      const commentId = req.params.id;
      const response = await CommentLogic.getCommentById({ commentId });
      res.json({
        success: true,
        message: "Fetched Comment Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateComment(req, res, next) {
    try {
      const commentId = req.params.id;
      const userId = req.currentUser?.id as string;
      const input = req.body;
      const response = await CommentLogic.updateComment({
        commentId,
        userId,
        input,
      });
      res.json({
        success: true,
        message: "Comment updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};
