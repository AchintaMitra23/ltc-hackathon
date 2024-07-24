import { NextFunction, Request, Response } from "express";
import { createUser, findUserByUsername } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const mockResponses = {
  register: {
    success: {
      status: 201,
      body: {
        message: "User added successfully",
        userId: "user123",
      },
    },
  },
  login: {
    success: {
    status: 200,
      body: {
        message: "Login successful",
        userId: "user123",
      },
    }
  },
};


export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email, mobile, preference, type } = req.body as {
    username: string;
    password: string;
    email: string;
    mobile: string;
    preference: string;
    type: string;
  };
  try {
    if (process.env.IS_TESTING === "true") {
      return res.status(201).json(mockResponses.register.success);
    } else {
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const userId = await createUser({
        username,
        password,
        email,
        mobile,
        preference,
        type,
      });

      if (!userId) {
        return res.status(500).send("Failed to register user");
      }

      res.status(201).send(`User added with ID: ${userId}`);
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
  console.log("process.env.IS_TESTING "+process.env.IS_TESTING);
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  
  try {
    if (process.env.IS_TESTING === "true") {
      return res.status(200).json(mockResponses.login.success);
    } else {
      const user = await findUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).send("Invalid credentials");
      }

      res.status(200).send("Login successful");
    }
  } catch (error) {
    next(error);
  }
};
