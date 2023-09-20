import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  if (err.status === 404) {
    statusCode = 404;
    errorMessage = "Not Found";
  } else if (err.status === 403) {
    statusCode = 403;
    errorMessage = "Forbidden";
  } else if (err.status === 401) {
    statusCode = 401;
    errorMessage = "Unauthorized";
  }
  res.status(statusCode).json({ status: "Error", message: errorMessage });
};
