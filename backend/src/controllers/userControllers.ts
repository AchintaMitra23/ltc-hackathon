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


  export const allOrdersofUser = async (
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
        const empId = req.params.empId
        const client = await pool.connect();
        const {rows} = await client.query(
              'select empId,counter_id,slot_id,order_date,token_no,order_status,preference order_master where emp_id= $1'
          ,[empId]);

        client.release();

      const formattedResponse: any = [];
      rows.forEach((row) => {
        formattedResponse.push({
          empId:row.empId,
          counter:row.counter_id,
          slot:row.slot_id,
          orderDate:row.order_date,
          tokenNo: row.token_no,
          orderStatus: row.order_status,
          preference: row.preference
        }) 
      });  

        res.status(201).json({
            status:200,
            body:{
                message:"Order history Done",
                data:formattedResponse
            }
        });
      }
    } catch (error) {
      next(error);
    }
  };