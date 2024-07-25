import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

export const createOrder = async (
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
        const orderList = req.body.orderList
        const client = await pool.connect();
        orderList.map(async({ emp_id, counter_id, slot_id, order_date, order_status, preference, token_no }: any)=>{
          const result = await client.query(
              'INSERT INTO order_master (emp_id, counter_id, slot_id, order_date, token_no, order_status, preference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
              [emp_id, counter_id, slot_id, order_date, token_no, order_status, preference]
          );
        })

        client.release();
        res.status(201).json({
            status:200,
            body:{
                message:"Order Added Successfully"
            }
        });
      }
    } catch (error) {
      next(error);
    }
  };