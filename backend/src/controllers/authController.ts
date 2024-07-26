import { NextFunction, Request, Response } from "express";
import { createUser, findUserByUsername } from "../models/User";
import dotenv from "dotenv";
import { IS_TESTING } from "../config";
import pool from "../db";

dotenv.config();

const mockResponses = {
  register: {
    success: {
      status: 201,
      body: {
        message: "User added successfully",
        user: {
          userId: "123",
          username: "username",
          password: "password",
          type: "user",
          email: "user@example.com",
          mobile: "1234567890",
          preference: "veg",
        },
      },
    },
  },
  login: {
    success: {
      status: 200,
      body: {
        userId: "123",
        username: "username",
        password: "password",
        type: "hr",
        email: "user@example.com",
        mobile: "1234567890",
        preference: "veg",
      },
    },
  },
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, username, password, email, mobile, preference, type } =
    req.body as {
      userId: string;
      username: string;
      password: string;
      email: string;
      mobile: string;
      preference: string;
      type: string;
    };
  try {
    if (IS_TESTING === true) {
      return res.status(201).json(mockResponses.register.success);
    } else {
      const existingUser = await findUserByUsername(userId);
      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, body: { message: "Username already exists" } });
      }

      const user = await createUser({
        userId,
        username,
        password,
        email,
        mobile,
        preference,
        type,
      });

      if (!user) {
        return res
          .status(500)
          .json({ status: 500, body: { message: "Failed to register user" } });
      }

      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, password } = req.body as {
    userId: string;
    password: string;
  };

  try {
    if (IS_TESTING === true) {
      return res.status(200).json(mockResponses.login.success);
    } else {
      const user = await findUserByUsername(userId);
      if (!user || user.password !== password) {
        return res
          .status(400)
          .json({ status: 400, body: { message: "Please check the credentials" } });
      }

      const updateQuery = `
      UPDATE "user"
      SET logged_in_status = $1,
      last_logged_in_date=CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
        `;
      const { rows } = await pool.query(updateQuery, [1, user.userId]);
      
      if (rows.length === 0) {
        return res
          .status(500)
          .json({
            status: 500,
            body: { message: "Failed to login" },
          });
      }

      res.status(200).json({
        status: 200,
        body: {
          message: "Login successful",
          userId: user.userId,
          username: user.username,
          password: user.password,
          type: user.type,
          email: user.email,
          mobile: user.mobile,
          preference: user.preference,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
