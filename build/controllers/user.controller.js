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
exports.UserController = void 0;
const user_logic_1 = require("../business.logic/user.logic");
exports.UserController = {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body;
                const response = yield user_logic_1.UserLogic.signUp({ input });
                res.json({
                    success: true,
                    message: "User signed up successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield user_logic_1.UserLogic.signIn({ email, password });
                res.json({
                    success: true,
                    message: "User signed in successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
