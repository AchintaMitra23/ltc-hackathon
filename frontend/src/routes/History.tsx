/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { OrderHistory } from "../types";

const History = () => {
  const employeeID: string = localStorage.getItem("employeeID");
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([
    {
      empId: 5606349,
      counter: "Counter 1",
      slot: "12:00 pm - 12:15 pm",
      orderDate: "21-02-2023",
      tokenNo: "TK-003",
      orderStatus: "Completed",
      preference: "Veg",
    },
    {
      empId: 5708890,
      counter: "Counter 2",
      slot: "1:00 pm - 1:15 pm",
      orderDate: "20-02-2023",
      tokenNo: "TK-002",
      orderStatus: "Cancelled",
      preference: "Veg",
    },
  ]);

  useEffect(() => {
    // call the api to get all the order history by employee ID
  }, [employeeID]);

  return (
    <div>
      <div>
        {orderHistory.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {orderHistory.map((item, index) => (
              <div key={index}>
                <span>
                  {item.tokenNo} - {item.counter} - {item.slot} -{" "}
                  {item.orderDate} - {item.orderStatus} - {item.preference}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
