import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught by middleware:", err);
  res
    .status(500)
    .json({ status: 500, body: { error: "Internal server error" } });
};
