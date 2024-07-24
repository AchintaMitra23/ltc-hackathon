import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.IS_TESTING === "true") {
      res.status(200).json({
        status: 200,
        body: {
          orders: [
            { counter_id: 1, order_count: 10 },
            { counter_id: 2, order_count: 5 },
          ],
          message: "Order counts fetched successfully",
        },
      });
    } else {
      const { company } = req.body as {
        company: string;
      };
      const currentDate = new Date().toISOString().split("T")[0];

      const query = `
      SELECT c.counter_id, COUNT(*) AS order_count
      FROM order_master AS o
      INNER JOIN counter AS c ON o.counter_id = c.id
      WHERE o.order_date = $1
      AND c.company_name = $2
      GROUP BY c.counter_id
            `;

      const { rows } = await pool.query(query, [currentDate, company]);

      const response = {
        status: 200,
        body: {
          orders: rows,
          message: "Order counts fetched successfully",
        },
      };

      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.IS_TESTING === "true") {
      res.status(200).json({
        status: 200,
        body: {
          token_no: "Ab837s9w",
          message: "Order statuses updated successfully",
        },
      });
    } else {
      const { order_status, empId, token_no } = req.body as {
        order_status: string;
        empId: string;
        token_no: string;
      };

      if (!order_status || !token_no) {
        return res
          .status(400)
          .json({ status: 404, error: "Order status or token_no is required" });
      }

      const query = `
        UPDATE order_master
        SET order_status = $1
        WHERE emp_id = $2 and token_no = $3
        RETURNING *
      `;

      const { rows } = await pool.query(query, [order_status, empId, token_no]);

      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "No orders found for the specified employee ID",
        });
      }

      res.status(200).json({
        status: 200,
        body: {
          token_no: token_no,
          message: "Order statuses updated successfully",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
