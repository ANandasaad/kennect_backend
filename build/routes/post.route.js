"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const router = express_1.default.Router();
router.post("/create-post", authentication_middleware_1.authenticate.authUser, post_controller_1.PostController.createPost);
router.delete("/delete-post/:id", authentication_middleware_1.authenticate.authUser, post_controller_1.PostController.deletePost);
router.put("/update-post/:id", authentication_middleware_1.authenticate.authUser, post_controller_1.PostController.updatePost);
router.get("/get-post-by-id/:id", post_controller_1.PostController.getPostById);
router.get("/get-all-post", post_controller_1.PostController.getAllPosts);
exports.default = router;
