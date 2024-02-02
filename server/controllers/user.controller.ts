import { RequestHandler } from "express";
import { UserLogic } from "../business.logic/user.logic";

export const UserController: {
  signUp: RequestHandler;
  signIn: RequestHandler;
} = {
  async signUp(req, res, next) {
    try {
      const input = req.body;
      const response = await UserLogic.signUp({ input });
      res.json({
        success: true,
        message: "User signed up successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await UserLogic.signIn({ email, password });
      res.json({
        success: true,
        message: "User signed in successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};
