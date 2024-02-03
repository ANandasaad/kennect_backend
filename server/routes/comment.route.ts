import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { authenticate } from "../middlewares/authentication.middleware";
const router = express.Router();
router.post(
  "/create-comment",
  authenticate.authUser,
  CommentController.createComment
);
router.delete(
  "/delete-comment/:commentId/:postId",
  authenticate.authUser,
  CommentController.deleteComment
);
router.get(
  "/get-comment-by-id/:id",
  authenticate.authUser,
  CommentController.getCommentBYId
);
router.get("/get-all-comments", CommentController.getAllCOmments);
router.put(
  "/update-comment/:id",
  authenticate.authUser,
  CommentController.updateComment
);
export default router;
