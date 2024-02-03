"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const router = express_1.default.Router();
router.post("/create-comment", authentication_middleware_1.authenticate.authUser, comment_controller_1.CommentController.createComment);
router.delete("/delete-comment/:commentId/:postId", authentication_middleware_1.authenticate.authUser, comment_controller_1.CommentController.deleteComment);
router.get("/get-comment-by-id/:id", authentication_middleware_1.authenticate.authUser, comment_controller_1.CommentController.getCommentBYId);
router.get("/get-all-comments", comment_controller_1.CommentController.getAllCOmments);
router.put("/update-comment/:id", authentication_middleware_1.authenticate.authUser, comment_controller_1.CommentController.updateComment);
exports.default = router;
