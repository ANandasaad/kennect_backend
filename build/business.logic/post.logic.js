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
exports.PostLogic = void 0;
const config_1 = require("../config");
const http_errors_1 = require("http-errors");
exports.PostLogic = {
    createPost({ userId, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { caption } = input;
                    const isUserExist = yield config_1.prisma.user.findUnique({
                        where: {
                            id: userId,
                        },
                    });
                    if (!isUserExist)
                        throw new http_errors_1.NotFound("User not found");
                    const create = yield config_1.prisma.post.create({
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
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    deletePost({ userId, postId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isPOstExist = yield config_1.prisma.post.findUnique({
                        where: {
                            id: postId,
                            userId,
                        },
                    });
                    if (!isPOstExist)
                        throw new http_errors_1.NotFound("Post not found , Please add post ");
                    const deletePost = yield config_1.prisma.post.delete({
                        where: {
                            id: postId,
                            userId,
                        },
                    });
                    return resolve(deletePost);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    getAllPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { skip, search, take } = input;
                    const skipItems = Number(take) * Number(skip - 1);
                    const skipLimit = {};
                    if (Number(skip) && Number(take))
                        Object.assign(skipLimit, { skip: skipItems, take: Number(take) });
                    const posts = yield config_1.prisma.post.findMany(Object.assign(Object.assign({}, skipLimit), { where: {
                            caption: {
                                contains: search,
                                mode: "insensitive",
                            },
                        }, include: {
                            Comment: true,
                        } }));
                    if (!posts.length)
                        throw new http_errors_1.NotFound("No posts found");
                    const pagination = {
                        skip: Number(take) * Number(skip - 1),
                        take: Number(take),
                    };
                    return resolve({ posts, pagination });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    getPostById({ postId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isPostExist = yield config_1.prisma.post.findUnique({
                        where: {
                            id: postId,
                        },
                        include: {
                            Comment: true,
                        },
                    });
                    if (!isPostExist)
                        throw new http_errors_1.NotFound("Post not found");
                    return resolve(isPostExist);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    updatePost({ userId, postId, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { caption } = input;
                    const isPOstExist = yield config_1.prisma.post.findUnique({
                        where: {
                            id: postId,
                            userId,
                        },
                    });
                    if (!isPOstExist)
                        throw new http_errors_1.NotFound("Post not found");
                    const update = yield config_1.prisma.post.update({
                        where: {
                            id: postId,
                            userId,
                        },
                        data: {
                            caption,
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
};
