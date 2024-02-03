"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_logic_1 = require("../business.logic/post.logic");
exports.PostController = {
    createPost(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                console.log(userId);
                const input = req.body;
                const response = yield post_logic_1.PostLogic.createPost({ userId, input });
                res.json({
                    success: true,
                    message: "Post created successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deletePost(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const postId = req.params.id;
                const response = yield post_logic_1.PostLogic.deletePost({ userId, postId });
                res.json({
                    success: true,
                    message: "Post deleted successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    updatePost(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.id;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const input = req.body;
                const response = yield post_logic_1.PostLogic.updatePost({ userId, postId, input });
                res.json({
                    success: true,
                    message: "Post updated successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.id;
                console.log(postId);
                const response = yield post_logic_1.PostLogic.getPostById({ postId });
                res.json({
                    success: true,
                    message: "Post fetched successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.query;
                const response = yield post_logic_1.PostLogic.getAllPosts(input);
                res.json({
                    success: true,
                    message: "Posts fetched successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
