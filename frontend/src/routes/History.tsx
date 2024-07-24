/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { OrderHistory } from "../types";
import { LiStyle1, SpanStyle2, SpanStyle3, StatusStyle, StyledDiv2, UlStyle1 } from "../styles/Login.styled";

const History = () => {
  const employeeID: number = parseInt(localStorage.getItem("employeeID"), 10);
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
      <div className="text-center mt-5">
        {orderHistory.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {orderHistory.map((item, index) => (
              <div key={index}>
                <StyledDiv2 className="card w-75 mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{item.tokenNo}</h5>
                    <UlStyle1>
                      <LiStyle1>
                        <SpanStyle2>Counter : </SpanStyle2>
                        <SpanStyle3>{item.counter}</SpanStyle3>
                      </LiStyle1>
                      <LiStyle1>
                        <SpanStyle2>Slot : </SpanStyle2>
                        <SpanStyle3>{item.slot}</SpanStyle3>
                      </LiStyle1>
                      <LiStyle1>
                        <SpanStyle2>Order Date : </SpanStyle2>
                        <SpanStyle3>{item.orderDate}</SpanStyle3>
                      </LiStyle1>
                      <LiStyle1>
                        <SpanStyle2>Preference : </SpanStyle2>
                        <SpanStyle3>{item.preference}</SpanStyle3>
                      </LiStyle1>
                      <LiStyle1>
                        <StatusStyle>{item.orderStatus}</StatusStyle>
                      </LiStyle1>
                    </UlStyle1>
                  </div>
                </StyledDiv2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
