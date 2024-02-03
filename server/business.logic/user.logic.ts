import { Prisma } from "@prisma/client";
import { configs, prisma } from "../config";
import { Conflict, NotFound } from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
type SIGN_UP_TYPE = {
  input: Prisma.UserCreateInput;
};
type SIGN_IN_TYPE = {
  email: string;
  password: string;
};
type Ids = {
  userId: string;
};

export const UserLogic = {
  async signUp({ input }: SIGN_UP_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const { firstName, lastName, email, password } = input;
        const isUserExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (isUserExists) throw new Conflict("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          },
        });
        return resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
  async signIn({ email, password }: SIGN_IN_TYPE) {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!isUserExists) throw new Conflict("User not found");
        const decodePassword = await bcrypt.compare(
          password,
          isUserExists.password
        );
        if (!decodePassword) throw new NotFound("Password is not valid");

        const update = await prisma.user.update({
          where: {
            id: isUserExists.id,
          },
          data: {
            isLogged: true,
          },
        });

        const token = await jwt.sign(
          { id: isUserExists.id },
          configs.JWT_SECRET
        );

        return resolve({ user: update, token });
      } catch (error) {
        reject(error);
      }
    });
  },

  async logOut({ userId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const userLogOut = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            isLogged: false,
          },

          select: {
            firstName: true,
            lastName: true,
            isLogged: true,
          },
        });
        return resolve(userLogOut);
      } catch (error) {
        reject(error);
      }
    });
  },
  async selfUser({ userId }: Ids) {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExists = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (!isUserExists) throw new NotFound("User not found");
        return resolve(isUserExists);
      } catch (error) {
        reject(error);
      }
    });
  },
};
