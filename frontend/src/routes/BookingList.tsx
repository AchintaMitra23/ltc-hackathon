import { useState } from "react";
import ListItems from "../components/ListItems";
import { ListItem } from "../types";

const BookingList = () => {
  const [company, setCompany] = useState<string>();
  const [counter, setCounter] = useState<string>();
  const [slot, setSlot] = useState<string>();
  const [itemList, setItemList] = useState<ListItem[]>([
    {
      tokenNo: "TK-001",
      employeeId: 5606349,
      orderDate: "24-10-2023",
      orderDone: false,
    },
    {
      tokenNo: "TK-002",
      employeeId: 9909909,
      orderDate: "24-10-2023",
      orderDone: false,
    },
    {
      tokenNo: "TK-003",
      employeeId: 8908900,
      orderDate: "24-10-2023",
      orderDone: false,
    },
  ]);

  const searchCriteriaRequest = {
    companyName: company,
    counter: counter,
    slot: slot,
  };

  const onSearch = () => {
    console.log(searchCriteriaRequest);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <label className="form-label">Company Name</label>
          <div className="form-floating mb-3">
            <select
              name="company"
              id="company"
              onChange={(e) => setCompany(e.currentTarget.value)}
            >
              <option value="">Please select the option</option>
              <option value="ltc">Lloyds Technology Center</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3">
          <label className="form-label">Counter</label>
          <div className="form-floating mb-3">
            <select
              name="counter"
              id="counter"
              onChange={(e) => setCounter(e.currentTarget.value)}
            >
              <option value="">Please select the option</option>
              <option value="1">Counter 1</option>
              <option value="2">Counter 2</option>
              <option value="3">Counter 3</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3">
          <label className="form-label">Slot</label>
          <div className="form-floating mb-3">
            <select
              name="slot"
              id="slot"
              onChange={(e) => setSlot(e.currentTarget.value)}
            >
              <option value="">Please select the option</option>
              <option value="1">12:00 pm - 12:15 pm</option>
              <option value="2">12:15 pm - 12:30 pm</option>
              <option value="3">12:30 pm - 12:45 pm</option>
              <option value="4">12:45 pm - 1:00 pm</option>
              <option value="5">1:00 pm - 1:15 pm</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3">
          <button type="button" onClick={onSearch}>
            Search
          </button>
        </div>
        <ListItems itemList={itemList} setItemList={setItemList} />
      </div>
    </div>
  );
};

export default BookingList;
