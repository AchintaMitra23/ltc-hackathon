import { Request, Response } from "express";
import { createUser, findUserByUsername } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email, mobile, type } = req.body as {
    username: string;
    password: string;
    email: string;
    mobile: string;
    type: string;
  };
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const userId = await createUser({
      username,
      password,
      email,
      mobile,
      type,
    });

    if (!userId) {
      return res.status(500).send("Failed to register user");
    }

    res.status(201).send(`User added with ID: ${userId}`);
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).send("Error registering user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  try {
    const user = await findUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error authenticating user", error);
    res.status(500).send("Error authenticating user");
  }
};
