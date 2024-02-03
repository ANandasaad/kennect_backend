"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const express_validator_1 = require("express-validator");
exports.UserValidation = {
    signUp: [
        (0, express_validator_1.body)("firstName")
            .trim()
            .notEmpty()
            .withMessage("First name is required")
            .bail()
            .isLength({ max: 255 })
            .withMessage("First name should not be more than 255 characters"),
        (0, express_validator_1.body)("lastName")
            .trim()
            .notEmpty()
            .withMessage("Last name is required")
            .bail()
            .isLength({ max: 255 })
            .withMessage("Last name should not be more than 255 characters"),
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email address"),
        (0, express_validator_1.body)("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 6 })
            .withMessage("Password should be at least 6 characters long"),
    ],
    signIn: [
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email address"),
        (0, express_validator_1.body)("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isString()
            .withMessage("Password should be string"),
    ],
};
