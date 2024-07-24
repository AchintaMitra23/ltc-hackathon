import { Pool } from "pg";
import pool from "../db";

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  mobile: string;
  preference: string;
  type: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export const findUserByUsername = async (
  username: string
): Promise<LoginUser | null> => {
  try {
    let query;
    let user: LoginUser | null = null;

    query = 'SELECT username, password FROM "customer" WHERE username = $1';
    const { rows: customerRows } = await pool.query(query, [username]);
    if (customerRows.length > 0) {
      user = {
        username: customerRows[0].username,
        password: customerRows[0].password,
      };
    }

    return user;
  } catch (error) {
    console.error("Error finding user by username", error);
    return null;
  }
};

export const createUser = async (user: User): Promise<{ status: number; body: any }> => {
  try {
    let query;
    let values;

    switch (user.type) {
      case "admin":
        query = `INSERT INTO "customer" (username, password, email, mobile, preference, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
        VALUES ($1, $2, $3, $4, null, 0, 0, 0, CURRENT_TIMESTAMP, null) RETURNING id`;
        values = [user.username, user.password, user.email, user.mobile];
        break;
      case "customer":
        query = `INSERT INTO "customer" (username, password, email, mobile, preference, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
                 VALUES ($1, $2, $3, $4, $5, 0, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id`;
        values = [
          user.username,
          user.password,
          user.email,
          user.mobile,
          user.preference,
        ];
        break;
      default:
        throw new Error(`Unsupported user type: ${user.type}`);
    }

    const { rows } = await pool.query(query, values);
    const userId = rows[0].id;

    return {
      status: 201,
      body: {
        message: "User added successfully",
        userId: userId.toString(),
      },
    };
  } catch (error) {
    console.error("Error creating user", error);
    return {
      status: 500,
      body: {
        error: "Failed to register user",
      },
    };
  }
};
