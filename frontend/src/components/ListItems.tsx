/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { updateOrders } from "../apis/updateOrders";
import {
  ButtonStyle1,
  CheckBoxStyle1,
  DivStyle2,
  SpanStyle1,
} from "../styles/Login.styled";
import { ListItem } from "../types";

interface ListItemsProps {
  itemList: ListItem[];
  setItemList: (value: ListItem[]) => void;
}

const ListItems = ({ itemList, setItemList }: ListItemsProps) => {
  const [successResponse, setSuccessResponse] = useState<string>("");
  if (itemList.length > 0) {
    itemList.sort((a, b) => a.orderDone - b.orderDone);
  }

  const handleComplete = (tokenNo: string) => {
    let newItems: ListItem[] = [];
    for (let i of itemList) {
      if (i.tokenNo === tokenNo) {
        i.orderDone = !i.orderDone;
      }
      newItems.push(i);
    }
    setItemList(newItems);
  };

  const onDone = async () => {
    await updateOrders(itemList)
      .then((response) => {
        if (response.status === 200) {
          setItemList([]);
          setSuccessResponse(response.body.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (successResponse !== "") {
    return <h4>{successResponse}</h4>
  }

  return (
    <div>
      <div>
        {itemList.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {itemList.map((item: ListItem, index: number) => (
              <DivStyle2 key={index}>
                <CheckBoxStyle1
                  type="checkbox"
                  onChange={() => handleComplete(item.tokenNo)}
                  checked={item.orderDone}
                  disabled={item.orderDone}
                />
                <SpanStyle1>{item.tokenNo}</SpanStyle1>
                <SpanStyle1>{item.employeeId}</SpanStyle1>
                <SpanStyle1>{item.orderDate}</SpanStyle1>
              </DivStyle2>
            ))}
            <ButtonStyle1 type="button" onClick={onDone}>
              Done
            </ButtonStyle1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItems;
