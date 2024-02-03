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
exports.CommentController = void 0;
const comment_logic_1 = require("../business.logic/comment.logic");
exports.CommentController = {
    createComment(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const input = req.body;
                const response = yield comment_logic_1.CommentLogic.createComment({ userId, input });
                res.json({
                    success: true,
                    message: "Comment created successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteComment(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const { postId, commentId } = req.params;
                const response = yield comment_logic_1.CommentLogic.deleteComment({
                    userId,
                    postId,
                    commentId,
                });
                res.json({
                    success: true,
                    message: "Comment deleted successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getAllCOmments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.query;
                const response = yield comment_logic_1.CommentLogic.getAllComments(input);
                res.json({
                    success: true,
                    message: "Comments retrieved successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getCommentBYId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.id;
                const response = yield comment_logic_1.CommentLogic.getCommentById({ commentId });
                res.json({
                    success: true,
                    message: "Fetched Comment Successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    updateComment(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.id;
                const userId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                const input = req.body;
                const response = yield comment_logic_1.CommentLogic.updateComment({
                    commentId,
                    userId,
                    input,
                });
                res.json({
                    success: true,
                    message: "Comment updated successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
