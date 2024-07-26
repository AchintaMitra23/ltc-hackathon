import { NextFunction, Request, Response } from "express";
import pool from "../db";
import dotenv from "dotenv";
import { IS_TESTING } from "../config";

dotenv.config();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (IS_TESTING === "true") {
      res.status(201).json({
        status: 200,
        body: {
          token_no: "Ab837s9w",
          message: "Order Added Successfully",
        },
      });
    } else {
      const orderList = req.body.orderList;
      const client = await pool.connect();
      orderList.map(
        async ({
          emp_id,
          counter_id,
          slot_id,
          order_date,
          order_status,
          preference,
          token_no,
        }: any) => {
          const result = await client.query(
            "INSERT INTO order_master (emp_id, counter_id, slot_id, order_date, token_no, order_status, preference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
              emp_id,
              counter_id,
              slot_id,
              order_date,
              token_no,
              order_status,
              preference,
            ]
          );
        }
      );

      client.release();
      res.status(201).json({
        status: 200,
        body: {
          message: "Order Added Successfully",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const allOrdersOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (IS_TESTING === "true") {
      res.status(200).json({
        status: 200,
        body: {
          message: "Order Added Successfully",
          data: [
            {
              empId: "5606060",
              counter: "Counter 1",
              slot: "12:00 pm - 12:15 pm",
              orderDate: "21-02-2023",
              tokenNo: "TK-003",
              orderStatus: "active",
              preference: "Veg",
            },
            {
              empId: "5606349",
              counter: "Counter 1",
              slot: "12:00 pm - 12:15 pm",
              orderDate: "21-02-2023",
              tokenNo: "TK-003",
              orderStatus: "completed",
              preference: "Veg",
            },
            {
              empId: "5708890",
              counter: "Counter 2",
              slot: "1:00 pm - 1:15 pm",
              orderDate: "20-02-2023",
              tokenNo: "TK-002",
              orderStatus: "cancelled",
              preference: "Veg",
            },
          ],
        },
      });
    } else {
      const empId = req.params.empId;
      const client = await pool.connect();
      const { rows } = await client.query(
        "select empId,counter_id,slot_id,order_date,token_no,order_status,preference order_master where emp_id= $1",
        [empId]
      );

      client.release();

      const formattedResponse: any = [];
      rows.forEach((row) => {
        formattedResponse.push({
          empId: row.empId,
          counter: row.counter_id,
          slot: row.slot_id,
          orderDate: row.order_date,
          tokenNo: row.token_no,
          orderStatus: row.order_status,
          preference: row.preference,
        });
      });

      res.status(200).json({
        status: 200,
        body: {
          message: "Order history Done",
          data: formattedResponse,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const DateOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (IS_TESTING === "true") {
      res.status(200).json({
        status: 200,
        body: {
          orders: {
            "2024-07-29": {
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
            "2024-07-30": {
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
          },
          message: "Order counts fetched successfully",
        },
      });
    } else {
      const { company, dates } = req.body as {
        company: string;
        dates: string[];
      };

      const datesArray = dates.map((dateStr) => `'${dateStr}'`);

      const query = `
        SELECT
          c.counter_name,
          s.slot_name,
          s.id as slot_id,
          COUNT(o.id) AS order_count,
          o.order_date
        FROM
          counter c
        LEFT JOIN order_master o ON o.counter_id = c.id
        LEFT JOIN slot s ON o.slot_id = s.id
        WHERE
          o.order_date::date IN (${datesArray.join(",")})
          AND c.company_name = $1
        GROUP BY
          c.counter_name, s.slot_name, s.id, o.order_date
        ORDER BY
          o.order_date, c.counter_name, s.slot_name;
      `;

      const { rows } = await pool.query(query, [company]);

      const formattedResponse: { [date: string]: { [counter: string]: any } } =
        {};

      rows.forEach((row) => {
        const isoDate = row.order_date.toISOString().split("T")[0];

        if (!formattedResponse[isoDate]) {
          formattedResponse[isoDate] = {};
        }

        if (!formattedResponse[isoDate][row.counter_name]) {
          formattedResponse[isoDate][row.counter_name] = {};
        }

        formattedResponse[isoDate][row.counter_name][row.slot_id] = {
          order_count: row.order_count,
          slot_name: row.slot_name,
        };
      });

      const response = {
        status: 200,
        body: formattedResponse,
      };

      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};
