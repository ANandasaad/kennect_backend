import PRISMA from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configs, prisma } from "../config";

import { Unauthorized } from "http-errors";

declare global {
  namespace Express {
    interface Request {
      currentUser?: PRISMA.User;
    }
  }
}

export const verifyToken = async (req: Request) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Unauthorized("Authorization header is required");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new Unauthorized("Token is required");
  }
  const payload = jwt.verify(token, configs.JWT_SECRET) as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  });
  if (!user) {
    throw new Unauthorized("User not found");
  }

  return user;
};

export const authenticate = {
  authUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await verifyToken(req);

      req.currentUser = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};
