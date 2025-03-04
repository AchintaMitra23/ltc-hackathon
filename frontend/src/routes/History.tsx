/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { OrderHistory } from "../types";
import {
  LiStyle1,
  SpanStyle2,
  SpanStyle3,
  StatusStyle,
  StyledDiv2,
  UlStyle1,
} from "../styles/Login.styled";
import { getOrderHistoryByEmpID } from "../apis/getOrderHistoryByEmpID";
import { updateOrders } from "../apis/updateOrders";
import { StyledCancelButton } from "../styles/History.styled";

const History = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);

  useEffect(() => {
    const empId: any = localStorage.getItem("employeeID");
    const employeeId: number = empId === null ? 0 : parseInt(empId, 10);
    getHistoryByEmployee(employeeId);
  }, []);

  const getHistoryByEmployee = async (employeeId: number) => {
    await getOrderHistoryByEmpID(employeeId)
      .then((response) => {
        if (response.status === 200) {
          setOrderHistory(response.body.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = async (item: OrderHistory) => {
    const orderUpdateRequestBody: any = {
      order_status: "cancelled",
      empId: [localStorage.getItem("employeeID")],
      token_no: [item.tokenNo],
    };
    await updateOrders(orderUpdateRequestBody)
      .then((response) => {
        if (response.status === 200) {
          alert(response.body.message);
          const empId: any = localStorage.getItem("employeeID");
          const employeeId: number = empId === null ? 0 : parseInt(empId, 10);
          getHistoryByEmployee(employeeId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-center mt-5">
      {orderHistory.length === 0 ? (
        <h4>Nothing to show.....</h4>
      ) : (
        <div className="container">
          <div className="row">
            {orderHistory.map((item: OrderHistory, index: number) => (
              <div key={index} className="col-lg-4">
                <StyledDiv2 className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-center">
                      {item.tokenNo}
                    </h5>
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
                        <div style={{ display: "inline-flex" }}>
                          <StatusStyle>{item.orderStatus}</StatusStyle>
                          {item.orderStatus === "active" && (
                            <StyledCancelButton
                              type="button"
                              onClick={() => handleCancel(item)}
                            >
                              Cancel
                            </StyledCancelButton>
                          )}
                        </div>
                      </LiStyle1>
                    </UlStyle1>
                  </div>
                </StyledDiv2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
