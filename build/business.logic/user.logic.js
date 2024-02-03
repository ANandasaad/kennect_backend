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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogic = void 0;
const config_1 = require("../config");
const http_errors_1 = require("http-errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserLogic = {
    signUp({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { firstName, lastName, email, password } = input;
                    const isUserExists = yield config_1.prisma.user.findUnique({
                        where: {
                            email,
                        },
                    });
                    if (isUserExists)
                        throw new http_errors_1.Conflict("User already exists");
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const user = yield config_1.prisma.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password: hashedPassword,
                        },
                    });
                    return resolve(user);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    signIn({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isUserExists = yield config_1.prisma.user.findUnique({
                        where: {
                            email,
                        },
                    });
                    if (!isUserExists)
                        throw new http_errors_1.Conflict("User not found");
                    const decodePassword = yield bcrypt_1.default.compare(password, isUserExists.password);
                    if (!decodePassword)
                        throw new http_errors_1.NotFound("Password is not valid");
                    const token = yield jsonwebtoken_1.default.sign({ id: isUserExists.id }, config_1.configs.JWT_SECRET);
                    return resolve({ user: isUserExists, token });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
};
