"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_validation_1 = require("../validations/user.validation");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = express_1.default.Router();
router.post("/sign-up", user_validation_1.UserValidation.signUp, validation_middleware_1.validate, user_controller_1.UserController.signUp);
router.post("/sign-in", user_validation_1.UserValidation.signIn, validation_middleware_1.validate, user_controller_1.UserController.signIn);
exports.default = router;
