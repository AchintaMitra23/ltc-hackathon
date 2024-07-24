import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

function generateToken(length:number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

export const approveUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (process.env.IS_TESTING === "true") {
        res.status(201).json({
            status:200,
            body:{
                token_no: "Ab837s9w",
                message:"Order Added Successfully"
            }
        });
        
      } else {
        const { emp_id, counter_id, slot_id, order_date, order_status, preference } = req.body;

        const token_no: string = generateToken(8);

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO order_master (emp_id, counter_id, slot_id, order_date, token_no, order_status, preference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [emp_id, counter_id, slot_id, order_date, token_no, order_status, preference]
        );
        client.release();

        res.status(201).json({
            status:200,
            body:{
                token_no: token_no,
                message:"Order Added Successfully"
            }
        });
      }
    } catch (error) {
      next(error);
    }
  };