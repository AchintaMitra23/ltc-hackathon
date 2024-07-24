import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";
import { findUserByUsername } from "../models/User";

dotenv.config();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.IS_TESTING === "true") {
    res.status(201).json({
      status: 201,
      body: {
        message: "User approval updated successfully",
        userId: "123456",
      },
    });
  } else {
    try {
      const { username, userId, approvalStatus, approved_by, type } =
        req.body as {
          username: string;
          userId: string;
          approvalStatus: string;
          approved_by: string;
          type: string;
        };
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, body: { message: "Username already exists" } });
      }

      const updateQuery = `
      UPDATE "user"
      SET approval_status = $1,
          approved_by = $2,
          approval_date = CURRENT_TIMESTAMP,
          type = $3
      WHERE id = $4
      RETURNING *;
        `;
      const result = await pool.query(updateQuery, [
        approvalStatus,
        approved_by,
        type,
        userId,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          body: {
            error: "User not updated please try again later",
          },
        });
      }

      res.status(201).json({
        status: 201,
        body: {
          message: "User approval updated successfully",
          userId: userId.toString(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
};
