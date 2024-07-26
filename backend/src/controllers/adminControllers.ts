import { NextFunction, Request, Response } from "express";
import pool from "../db";

import { ListItem } from "../models/User";
import { IS_TESTING } from "../config";



interface FormattedResponse {
  [counter: string]: {
    [slot_id: number]: {
      order_count: number;
      slot_name: string;
    };
  };
}

export const getOrderCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (IS_TESTING === true) {
      res.status(200).json({
        status: 200,
        body: {
          orders: {
            "Counter 1": {
              1: { order_count: 30, slot_name: "12:00 to 12:15" },
              2: { order_count: 28, slot_name: "12:15 to 12:30" },
              3: { order_count: 25, slot_name: "12:30 to 12:45" },
              4: { order_count: 30, slot_name: "12:45 to 1:00" },
              5: { order_count: 20, slot_name: "1:00 to 1:15" },
              6: { order_count: 30, slot_name: "1:15 to 1:30" },
              7: { order_count: 18, slot_name: "1:30 to 1:45" },
              8: { order_count: 30, slot_name: "1:45 to 2:00" },
              9: { order_count: 0, slot_name: "2:00 to 3:00" },
            },
            "Counter 2": {
              10: { order_count: 22, slot_name: "12:00 to 12:15" },
              11: { order_count: 25, slot_name: "12:15 to 12:30" },
              12: { order_count: 27, slot_name: "12:30 to 12:45" },
              13: { order_count: 18, slot_name: "12:45 to 1:00" },
              14: { order_count: 15, slot_name: "1:00 to 1:15" },
              15: { order_count: 20, slot_name: "1:15 to 1:30" },
              16: { order_count: 22, slot_name: "1:30 to 1:45" },
              17: { order_count: 28, slot_name: "1:45 to 2:00" },
              18: { order_count: 0, slot_name: "2:00 to 3:00" },
            },
          },
          message: "Order counts fetched successfully",
        },
      });
    } else {
      const { company, date } = req.body as {
        company: string;
        date: Date;
      };

      const query = `
      SELECT
            c.counter_name,
            s.slot_name,
            s.id as slot_id,
            COUNT(o.id) AS order_count
        FROM
            counter c
        LEFT JOIN order_master o ON o.counter_id = c.id
        LEFT JOIN slot s ON o.slot_id = s.id
        WHERE
            o.order_date = $1
            AND c.company_name = $2
        GROUP BY
            c.counter_name, s.slot_name,s.id
        ORDER BY
            c.counter_name, s.slot_name;
            `;

      const { rows } = await pool.query(query, [date, company]);

      const formattedResponse: FormattedResponse = {};
      rows.forEach((row) => {
        if (!formattedResponse[row.counter_name]) {
          formattedResponse[row.counter_name] = {};
        }
        formattedResponse[row.counter_name][row.slot_id] = {
          order_count: row.order_count,
          slot_name: row.slot_name,
        };
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
    if (IS_TESTING === true) {
      res.status(200).json({
        status: 200,
        body: {
          message: "Order statuses updated successfully",
        },
      });
    } else {
      const { order_status, empId, token_no } = req.body as {
        order_status: string;
        empId: any;
        token_no: any;
      };
      const empIdList = empId.map((empid: any) => `'${empid}'`);
      const tokenNoList = token_no.map((tokenno: any) => `'${tokenno}'`);
      const query = `
        UPDATE order_master
        SET order_status = $1
        WHERE emp_id in (${empIdList.join(
          ","
        )}) and token_no in (${tokenNoList.join(",")})
        RETURNING *
      `;
      const { rows } = await pool.query(query, [order_status]);

      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "No orders found for the specified employee ID",
        });
      }

      res.status(200).json({
        status: 200,
        body: {
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
    if (IS_TESTING === true) {
      res.status(200).json({
        status: 200,
        body: {
          orders: [
            {
              tokenNo: "TK-001",
              employeeId: "5606349",
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: "active",
              preference: "veg",
            },
            {
              tokenNo: "TK-002",
              employeeId: "9909909",
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: "active",
              preference: "non-veg",
            },
            {
              tokenNo: "TK-003",
              employeeId: "8908900",
              orderDate: "24-10-2023",
              counterId: 1,
              slotId: 1,
              orderDone: "active",
              preference: "veg",
            },
          ],
        },
      });
    } else {
      const { company, counter, slot } = req.body as {
        company: string;
        counter: number;
        slot: number;
      };
      const currentDate = new Date().toISOString().split("T")[0];

      const query = `
      SELECT om.token_no AS "tokenNo",
             om.emp_id AS "employeeId",
             to_char(om.order_date, 'DD-MM-YYYY') AS "orderDate",
             om.counter_id AS "counterId",
             om.slot_id AS "slotId",
             om.order_status AS "orderDone",
             om.preference AS "preference"
      FROM order_master om
      WHERE om.order_date::date = $1 and om.order_status=$4
      and om.counter_id = $2 and om.slot_id = $3
    `;
      const { rows } = await pool.query(query, [
        currentDate,
        counter,
        slot,
        "active",
      ]);

      // Format the response as per the required structure
      const formattedResponse = rows.map((row: any) => ({
        tokenNo: row.tokenNo,
        employeeId: row.employeeId,
        orderDate: row.orderDate,
        counterId: row.counterId,
        slotId: row.slotId,
        orderDone: row.orderDone,
        preference: row.preference,
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
