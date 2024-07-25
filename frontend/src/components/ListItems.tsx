/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateOrders } from "../apis/updateOrders";
import {
  ButtonStyle1,
  CheckBoxStyle1,
  DivStyle2,
  SpanStyle1,
  SpanStyle2,
  SpanStyle3,
  SpanStyle4,
  StyledH4,
} from "../styles/ListItems.styled";
import { ListItem } from "../types";

interface ListItemsProps {
  itemList: ListItem[];
  setItemList: (value: ListItem[]) => void;
  setCompany: (value: string) => void;
  setCounter: (value: number) => void;
  setSlot: (value: number) => void;
}

const ListItems = ({
  itemList,
  setItemList,
  setCompany,
  setCounter,
  setSlot,
}: ListItemsProps) => {
  const handleComplete = (tokenNo: string) => {
    let newItems: ListItem[] = [];
    for (let i of itemList) {
      if (i.tokenNo === tokenNo) {
        i.orderDone = i.orderDone === "active" ? "completed" : "active";
      }
      newItems.push(i);
    }
    setItemList(newItems);
  };

  const updateOrdersRequestBody: any = {
    order_status: "completed",
    empId: [],
    token_no: [],
  };

  const onDone = async () => {
    itemList.map((item: ListItem) => {
      if (item.orderDone === "completed") {
        updateOrdersRequestBody.empId.push(
          parseInt(item.employeeId.toString(), 10)
        );
        updateOrdersRequestBody.token_no.push(item.tokenNo.toString());
      }
    });
    await updateOrders(updateOrdersRequestBody)
      .then((response) => {
        if (response.status === 200) {
          setItemList([]);
          setCompany("");
          setSlot(0);
          setCounter(0);
          alert(response.body.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {itemList.length === 0 ? (
        <StyledH4>Nothing to show.....</StyledH4>
      ) : (
        <div style={{ textAlign: "center" }}>
          {itemList.map((item: ListItem, index: number) => (
            <DivStyle2 key={index} className="container pt-4">
              <div className="row">
                <div className="col-lg-1 text-center">
                  <CheckBoxStyle1
                    type="checkbox"
                    onChange={() => handleComplete(item.tokenNo)}
                    checked={item.orderDone === "completed"}
                    disabled={item.orderDone === "completed"}
                  />
                </div>
                <div className="col-lg-6 text-center">
                  {item.preference === "veg" ? (
                    <SpanStyle1>{item.tokenNo}</SpanStyle1>
                  ) : (
                    <SpanStyle2>{item.tokenNo}</SpanStyle2>
                  )}
                </div>
                <div className="col-lg-1 text-center">
                  {item.preference === "veg" ? (
                    <SpanStyle1>{item.employeeId}</SpanStyle1>
                  ) : (
                    <SpanStyle2>{item.employeeId}</SpanStyle2>
                  )}
                </div>
                <div className="col-lg-2 text-center">
                  {item.preference === "veg" ? (
                    <SpanStyle1>{item.orderDate}</SpanStyle1>
                  ) : (
                    <SpanStyle2>{item.orderDate}</SpanStyle2>
                  )}
                </div>
                <div className="col-lg-2 text-center">
                  {item.preference === "veg" ? (
                    <SpanStyle3>Veg</SpanStyle3>
                  ) : (
                    <SpanStyle4>Non Veg</SpanStyle4>
                  )}
                </div>
              </div>
            </DivStyle2>
          ))}
          <ButtonStyle1 type="button" onClick={onDone}>
            Done
          </ButtonStyle1>
        </div>
      )}
    </div>
  );
};

export default ListItems;
