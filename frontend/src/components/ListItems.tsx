/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListItem } from "../types";

interface ListItemsProps {
  itemList: ListItem[];
  setItemList: (value: ListItem[]) => void;
}

const ListItems = ({ itemList, setItemList }: ListItemsProps) => {
  itemList.sort((a, b) => a.orderDone - b.orderDone);

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

  const onDone = () => {
    console.log(itemList);
  };

  return (
    <div>
      <div>
        {itemList.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {itemList.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => handleComplete(item.tokenNo)}
                  checked={item.orderDone}
                  disabled={item.orderDone}
                />
                <span>
                  {item.tokenNo} - {item.employeeId} - {item.orderDate}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <input type="button" value="Done" onClick={onDone} />
    </div>
  );
};

export default ListItems;
