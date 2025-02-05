import { Request, Response, NextFunction } from "express";
import { logger } from "../infrastructure/logger";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err.message);
  res.status(500).json({
    message: "Internal Server Error",
  });
}
