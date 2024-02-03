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
exports.CommentLogic = void 0;
const config_1 = require("../config");
const http_errors_1 = require("http-errors");
exports.CommentLogic = {
    createComment({ userId, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { message, postId } = input;
                    const isPostExist = yield config_1.prisma.post.findUnique({
                        where: {
                            id: postId,
                        },
                    });
                    if (!isPostExist)
                        throw new http_errors_1.NotFound("Post not found");
                    const create = yield config_1.prisma.comment.create({
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
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    deleteComment({ userId, postId, commentId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isPostExist = yield config_1.prisma.post.findUnique({
                        where: {
                            id: postId,
                        },
                    });
                    if (!isPostExist)
                        throw new http_errors_1.NotFound("Post not found");
                    const isCommentExist = yield config_1.prisma.comment.findUnique({
                        where: {
                            id: commentId,
                        },
                    });
                    if (!isCommentExist)
                        throw new http_errors_1.NotFound("Comment not found");
                    const deleteComment = yield config_1.prisma.comment.delete({
                        where: {
                            id: commentId,
                            userId,
                            postId,
                        },
                    });
                    return resolve(deleteComment);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    updateComment({ commentId, userId, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { message } = input;
                    const isCommentExist = yield config_1.prisma.comment.findUnique({
                        where: {
                            id: commentId,
                            userId,
                        },
                    });
                    if (!isCommentExist)
                        throw new http_errors_1.NotFound("Comment not found");
                    const update = yield config_1.prisma.comment.update({
                        where: {
                            id: commentId,
                            userId,
                        },
                        data: {
                            message,
                        },
                    });
                    return resolve(update);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    getCommentById({ commentId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isCommentExist = yield config_1.prisma.comment.findUnique({
                        where: {
                            id: commentId,
                        },
                    });
                    if (!isCommentExist)
                        throw new http_errors_1.NotFound("Comment not found");
                    return resolve(isCommentExist);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    getAllComments(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { skip, search, take } = input;
                    const skipItems = Number(take) * Number(skip - 1);
                    const skipLimit = {};
                    if (Number(skip) && Number(take))
                        Object.assign(skipLimit, { skip: skipItems, take: Number(take) });
                    const getAllComments = yield config_1.prisma.comment.findMany(Object.assign(Object.assign({}, skipLimit), { where: {
                            message: {
                                contains: search,
                                mode: "insensitive",
                            },
                        } }));
                    if (!getAllComments.length)
                        throw new http_errors_1.NotFound("No comments found");
                    const pagination = {
                        skip: Number(take) * Number(skip - 1),
                        take: Number(take),
                    };
                    return resolve({ getAllComments, pagination });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
};
