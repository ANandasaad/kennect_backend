import express from "express";
import { PostController } from "../controllers/post.controller";
import { authenticate } from "../middlewares/authentication.middleware";
const router = express.Router();
router.post("/create-post", authenticate.authUser, PostController.createPost);
router.delete(
  "/delete-post/:id",
  authenticate.authUser,
  PostController.deletePost
);
router.put(
  "/update-post/:id",
  authenticate.authUser,
  PostController.updatePost
);
router.get("/get-post-by-id/:id", PostController.getPostById);
router.get("/get-all-post", PostController.getAllPosts);
export default router;
