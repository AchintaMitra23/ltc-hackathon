import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";

dotenv.config();

interface FormattedResponse {
  [counter: string]: {
    [slot: string]: number;
  };
}

export const getOrderCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.IS_TESTING === "true") {
      res.status(200).json({
        status: 200,
        body: {
          orders: {
            "Counter 1": {
              "12:00 to 12:15": 30,
              "12:15 to 12:30": 28,
              "12:30 to 12:45": 25,
              "12:45 to 1:00": 30,
              "1:00 to 1:15": 20,
              "1:15 to 1:30": 30,
              "1:30 to 1:45": 18,
              "1:45 to 2:00": 30,
              "2:00 to 3:00": 0,
            },
            "Counter 2": {
              "12:00 to 12:15": 22,
              "12:15 to 12:30": 25,
              "12:30 to 12:45": 27,
              "12:45 to 1:00": 18,
              "1:00 to 1:15": 15,
              "1:15 to 1:30": 20,
              "1:30 to 1:45": 22,
              "1:45 to 2:00": 28,
              "2:00 to 3:00": 0,
            },
          },
          message: "Order counts fetched successfully",
        },
      });
    } else {
      const { company } = req.body as {
        company: string;
      };
      const currentDate = new Date().toISOString().split("T")[0];

      const query = `
      SELECT
            c.counter_name,
            s.slot_name,
            COUNT(o.id) AS order_count
        FROM
            counter c
        LEFT JOIN order_master o ON o.counter_id = c.id
        LEFT JOIN slot s ON o.slot_id = s.id
        WHERE
            o.order_date = $1
            AND c.company_name = $2
        GROUP BY
            c.counter_name, s.slot_name
        ORDER BY
            c.counter_name, s.slot_name;
            `;

      const { rows } = await pool.query(query, [currentDate, company]);

      const formattedResponse: FormattedResponse = {};
      rows.forEach((row) => {
        if (!formattedResponse[row.counter_name]) {
          formattedResponse[row.counter_name] = {};
        }
        formattedResponse[row.counter_name][row.slot_name] = row.order_count;
      });

      const response = {
        status: 200,
        body: {
          orders: formattedResponse,
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

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.IS_TESTING === "true") {
      res.status(200).json({
        "status": 200,
        "body": {
          "orders": [
            {
              "tokenNo": "TK-001",
              "employeeId": "5606349",
              "orderDate": "24-10-2023",
              "counterId": 1,
              "slotId": 1,
              "orderDone": "false"
            },
            {
              "tokenNo": "TK-002",
              "employeeId": "9909909",
              "orderDate": "24-10-2023",
              "counterId": 1,
              "slotId": 1,
              "orderDone": "false"
            },
            {
              "tokenNo": "TK-003",
              "employeeId": "8908900",
              "orderDate": "24-10-2023",
              "counterId": 1,
              "slotId": 1,
              "orderDone": "false"
            }
          ]
        }
      })
    } else {
      const currentDate = new Date().toISOString().split("T")[0];

      const query = `
      SELECT om.token_no AS "tokenNo",
             om.emp_id AS "employeeId",
             to_char(om.order_date, 'DD-MM-YYYY') AS "orderDate",
             om.counter_id AS "counterId",
             om.slot_id AS "slotId",
             om.order_status AS "orderDone"
      FROM order_master om
      WHERE om.order_date = $1 and om.order_status='false'
    `;

      const { rows } = await pool.query(query, [currentDate]);

      // Format the response as per the required structure
      const formattedResponse = rows.map((row: any) => ({
        tokenNo: row.tokenNo,
        employeeId: row.employeeId,
        orderDate: row.orderDate,
        counterId: row.counterId,
        slotId: row.slotId,
        orderDone: row.orderDone,
      }));

      res
        .status(200)
        .json({ status: 200, body: { orders: formattedResponse } });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    next(error);
  }
};
