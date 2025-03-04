import { NextFunction, Request, Response } from "express";
import pool from "../db";

import { findUserByUsername } from "../models/User";
import { IS_TESTING } from "../config";



export const approveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (IS_TESTING === true) {
    res.status(200).json({
      status: 200,
      body: {
        message: "User approval updated successfully",
        userId: "123456",
      },
    });
  } else {
    try {
      const { userId, approvalStatus, approved_by, type } = req.body as {
        userId: string;
        approvalStatus: string;
        approved_by: string;
        type: string;
      };
      const existingUser = await findUserByUsername(userId);
      if (!existingUser) {
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

      res.status(200).json({
        status: 200,
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

export const userToApprove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (IS_TESTING === true) {
    res.status(200).json({
      status: 200,
      body: {
        message: "User needed to Approve",
        user: [
          {
            userId: "5435654",
            username: "hhhdhdhd",
            email: "jdjfhdfkjdhf@hdjf.com",
            approval_status: "false",
          },
          {
            userId: "8946574",
            username: "hhhdhdhd",
            email: "jdjfhdfkjdhf@hdjf.com",
            approval_status: "false",
          },
          {
            userId: "0000000",
            username: "hhhdhdhd",
            email: "jdjfhdfkjdhf@hdjf.com",
            approval_status: "false",
          },
        ],
      },
    });
  } else {
    try {
      const Query = `
      select id,name,email,approval_status from "user"
      WHERE type = $1 and approval_status= $2;
        `;
      const { rows } = await pool.query(Query, ["admin", 0]);

      const formattedResponse: any = [];
      rows.forEach((row) => {
        formattedResponse.push({
          userId: row.id,
          username: row.name,
          email: row.email,
          approval_status: row.approval_status,
        });
      });

      res.status(200).json({
        status: 200,
        body: {
          message: "User needed to Approve",
          data: formattedResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }
};
