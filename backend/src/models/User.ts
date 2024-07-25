import { Pool } from "pg";
import pool from "../db";

export interface User {
  userId?: any;
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
  type: string;
  userId: string;
  email: string;
  mobile: string;
  preference: string;
}

interface ApiResponse {
  status: number;
  body: {
    message: string;
    user?: LoginUser;
  };
}

export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  counterId: number;
  slotId: number;
  orderDone: any | boolean;
}

export interface OrderHistory {
  empId: number;
  counter: string;
  slot: string;
  orderDate: string;
  tokenNo: string;
  orderStatus: string;
  preference: string;
}

export interface Admins {
  id: number;
  name: string;
  email: string;
  approval_status: boolean;
}

export interface LoginResponseModel {
  id: number;
  name: string;
  email: string;
  mobile: string;
  preference: string;
  type: string;
}

export const findUserByUsername = async (
  id: string,
): Promise<LoginUser | null> => {
  try {
    let query;
    let user: LoginUser | null = null;

    query =
      'SELECT id, name, type, email, mobile, preference FROM "user" WHERE id = $1';
    const { rows: userRows } = await pool.query(query, [id]);
    if (userRows.length > 0) {
      user = {
        userId: userRows[0].id,
        username: userRows[0].name,
        password: userRows[0].password,
        type: userRows[0].type,
        email: userRows[0].email,
        mobile: userRows[0].mobile,
        preference: userRows[0].preference,
      };
    }

    return user;
  } catch (error) {
    console.error("Error finding user by username", error);
    return null;
  }
};

export const createUser = async (user: User): Promise<ApiResponse> => {
  try {
    let query;
    let values;

    switch (user.type) {
      case "admin":
        query = `INSERT INTO "user" (id,name, password, email, mobile, preference,type, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
        VALUES ($1, $2, $3, $4, $5, null,"admin", 1, 0, 0, CURRENT_TIMESTAMP, null) RETURNING id`;
        values = [user.userId,user.username, user.password, user.email, user.mobile];
        break;
      case "user":
        query = `INSERT INTO "user" (id,name, password, email, mobile, preference,type, logged_in_status, approval_status, user_active_status, last_logged_in_date, approval_date) 
                 VALUES ($1, $2, $3, $4, $5, $6,"user" , 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id`;
        values = [
          user.userId,
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

    return {
      status: 201,
      body: {
        message: "User added successfully",
        user: {
          userId: rows[0].id,
          username: rows[0].name,
          password: rows[0].password,
          type: rows[0].type,
          email: rows[0].email,
          mobile: rows[0].mobile,
          preference: rows[0].preference,
        },
      },
    };
  } catch (error) {
    console.error("Error creating user", error);
    return {
      status: 500,
      body: {
        message: "Failed to register user",
      },
    };
  }
};
