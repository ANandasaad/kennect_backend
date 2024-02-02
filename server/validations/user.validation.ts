import { body } from "express-validator";

export const UserValidation = {
  signUp: [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .bail()
      .isLength({ max: 255 })
      .withMessage("First name should not be more than 255 characters"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .bail()
      .isLength({ max: 255 })
      .withMessage("Last name should not be more than 255 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  signIn: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password should be string"),
  ],
};
