import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import tablesRoutes from "./routes/tables";
import usersRoutes from "./routes/users";
import sessionMiddleware from "./middlewares/session";

const app = express();

app.use(express.json()); //Endpoints return only json

app.use(sessionMiddleware); // Use session middleware
app.use("/api/tables", tablesRoutes); // Use tables routes
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unkown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
