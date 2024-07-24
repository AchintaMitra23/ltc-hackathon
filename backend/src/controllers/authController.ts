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
        type:"user"
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
        return res.status(400).json({status:400,body:{message:"Username already exists"}});
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

      res.status(201).json({
        status: 201,
        body: {
          message: "User added successfully",
          userId: userId,
          type: type
        },
      });
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
        return res.status(400).json({status:400,body:{message:"Username already exists"}});
      }

      res.status(200).json({
        status: 200,
          body: {
            message: "Login successful",
            userId: user,
            type: user.type
          },
        });
    }
  } catch (error) {
    next(error);
  }
};
