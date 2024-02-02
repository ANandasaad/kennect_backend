import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserValidation } from "../validations/user.validation";
import { validate } from "../middlewares/validation.middleware";
const router = express.Router();
router.post("/sign-up", UserValidation.signUp, validate, UserController.signUp);
router.post("/sign-in", UserValidation.signIn, validate, UserController.signIn);
export default router;
