import { Pool } from "pg";
import pool from "../db";

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  mobile: string;
  preference?: string;
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

    query = 'SELECT username, password FROM "admin" WHERE username = $1';
    const { rows: adminRows } = await pool.query(query, [username]);
    if (adminRows.length > 0) {
      user = {
        username: adminRows[0].username,
        password: adminRows[0].password,
      };
    }

    if (!user) {
      query = 'SELECT username, password FROM "customer" WHERE username = $1';
      const { rows: customerRows } = await pool.query(query, [username]);
      if (customerRows.length > 0) {
        user = {
          username: customerRows[0].username,
          password: customerRows[0].password,
        };
      }
    }

    return user;
  } catch (error) {
    console.error("Error finding user by username", error);
    return null;
  }
};

export const createUser = async (user: User): Promise<number | null> => {
  try {
    let query;
    let values;

    switch (user.type) {
      case "admin":
        query = `INSERT INTO "admin" (username, password, email, mobile, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
                 VALUES ($1, $2, $3, $4, 0, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id`;
        values = [user.username, user.password, user.email, user.mobile];
        break;
      case "customer":
        query = `INSERT INTO "customer" (username, password, email, mobile, preference, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
                 VALUES ($1, $2, $3, $4, $5, 0, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id`;
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
    return rows[0].id;
  } catch (error) {
    console.error("Error creating user", error);
    return null;
  }
};
