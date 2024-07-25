import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

export interface ListItem {
  tokenNo: string;
  employeeId: number;
  orderDate: string;
  counterId: number;
  slotId: number;
  orderDone: any | boolean;
};

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
            {
              tokenNo: "TK-001",
              employeeId: 5606349,
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: false,
            },
            {
              tokenNo: "TK-002",
              employeeId: 9909909,
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: false,
            },
            {
              tokenNo: "TK-003",
              employeeId: 8908900,
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: false,
            }
          ],
        },
      });
    } else {
      const { company, counter, slot } = req.body as {
        company: string;
        counter: number;
        slot: number;
      };
      // const currentDate = new Date().toISOString().split("T")[0];

      // const query = `
      // SELECT c.counter_id, COUNT(*) AS order_count
      // FROM order_master AS o
      // INNER JOIN counter AS c ON o.counter_id = c.id
      // WHERE o.order_date = $1
      // AND c.company_name = $2
      // GROUP BY c.counter_id
      //       `;

      // const { rows } = await pool.query(query, [currentDate, company]);

      // const response = {
      //   status: 200,
      //   body: {
      //     orders: rows,
      //     message: "Order counts fetched successfully",
      //   },
      // };

      // res.status(200).json(response);
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
          message: "Order statuses updated successfully",
        },
      });
    } else {
      // const items: ListItem[] = req.body;

      // items.map(async (item: ListItem, index: number) => {
      //   if (!item.tokenNo) {
      //     return res
      //       .status(400)
      //       .json({ status: 404, error: "Token No. is required" });
      //   }
      //   const query = `
      //     UPDATE order_master
      //     SET order_status = $1
      //     WHERE emp_id = $2 and token_no = $3
      //     RETURNING *
      //   `;
      //   const { rows } = await pool.query(query, [item.orderDone ? 'Completed' : 'Active', item.employeeId, item.tokenNo]);
      // });

      // res.status(200).json({
      //   status: 200,
      //   body: {
      //     message: "Order statuses updated successfully",
      //   },
      // });
    }
  } catch (error) {
    next(error);
  }
};
