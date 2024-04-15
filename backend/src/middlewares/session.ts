import { NextFunction, Request, Response } from "express";
import session from "express-session";
import env from "../util/validateEnv";
import MongoStore from "connect-mongo";

function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
  return session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })(req, res, next);
}

export default sessionMiddleware;
