import { Request, RequestHandler } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import { configs, prisma } from "../config";
import PRISMA from "@prisma/client";

type JwtPayload = {
  userId: string;
};
declare global {
  namespace Express {
    interface Request {
      user?: PRISMA.User;
    }
  }
}
const verifyUser = async (req: Request) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Unauthorized("Authorization header is required");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new Unauthorized("Token is required");
  }
  const payload = jwt.verify(token, configs.JWT_SECRET) as JwtPayload;
  console.log(payload);
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });
  if (!user) {
    throw new Unauthorized("User not found");
  }

  return user;
};

export const authenticate: { authUser: RequestHandler } = {
  async authUser(req, res, next) {
    try {
      const user = await verifyUser(req);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};
