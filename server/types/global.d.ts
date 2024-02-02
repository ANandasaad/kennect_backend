import { Request } from "express";
interface MIDDLEWARE_REQUEST_TYPE extends Request {
  payload: {
    userId: string;
  };
}
