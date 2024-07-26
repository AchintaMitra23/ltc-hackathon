import { useState } from "react";
import ListItems from "../components/ListItems";
import { ListItem } from "../types";
import { ButtonStyle1, DivStyle1 } from "../styles/Login.styled";
import { getAllOrders } from "../apis/getAllOrders";
import {
  LabelStyle,
  StyledSelect,
  StyleOption,
} from "../styles/BookingList.styled";

const BookingList = () => {
  const [company, setCompany] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [slot, setSlot] = useState<number>(0);
  const [itemList, setItemList] = useState<ListItem[]>([]);

  const searchCriteriaRequest = {
    company: company,
    counter: counter,
    slot: slot,
  };

  const onSearch = async () => {
    await getAllOrders(searchCriteriaRequest)
      .then((response) => {
        if (response.status === 200) {
          setItemList(response.body.orders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 text-center">
          <LabelStyle className="form-label">Company</LabelStyle>
          <div className="form-floating mb-3">
            <StyledSelect
              name="company"
              id="company"
              onChange={(e) => setCompany(e.currentTarget.value)}
            >
              <StyleOption value="" selected={company === ""}>
                Please select the option
              </StyleOption>
              <StyleOption value="ltc" selected={company === "ltc"}>
                Lloyds Technology Centre
              </StyleOption>
            </StyledSelect>
          </div>
        </div>
        <div className="col-lg-3 text-center">
          <LabelStyle className="form-label">Counter</LabelStyle>
          <div className="form-floating mb-3">
            <StyledSelect
              name="counter"
              id="counter"
              onChange={(e) => setCounter(parseInt(e.currentTarget.value, 10))}
            >
              <StyleOption value="0" selected={counter === 0}>
                Please select the option
              </StyleOption>
              <StyleOption value="1">Counter 1</StyleOption>
              <StyleOption value="2">Counter 2</StyleOption>
            </StyledSelect>
          </div>
        </div>
        <div className="col-lg-3 text-center">
          <LabelStyle className="form-label">Slot</LabelStyle>
          <div className="form-floating mb-3">
            <StyledSelect
              name="slot"
              id="slot"
              onChange={(e) => setSlot(parseInt(e.currentTarget.value, 10))}
            >
              <StyleOption value="0" selected={slot === 0}>
                Please select the option
              </StyleOption>
              <StyleOption value="1">12:00 - 12:15</StyleOption>
              <StyleOption value="2">12:15 - 12:30</StyleOption>
              <StyleOption value="3">12:30 - 12:45</StyleOption>
              <StyleOption value="4">12:45 - 1:00</StyleOption>
              <StyleOption value="5">1:00 - 1:15</StyleOption>
              <StyleOption value="6">1:15 - 1:30</StyleOption>
              <StyleOption value="7">1:30 - 1:45</StyleOption>
              <StyleOption value="8">1:45 - 2:00</StyleOption>
              <StyleOption value="9">2:00 - 2:15</StyleOption>
              <StyleOption value="10">2:15 - 2:30</StyleOption>
              <StyleOption value="11">2:30 - 2:45</StyleOption>
              <StyleOption value="12">2:45 - 3:00</StyleOption>
            </StyledSelect>
          </div>
        </div>
        <DivStyle1 className="col-lg-3">
          <ButtonStyle1
            type="button"
            onClick={onSearch}
            disabled={company === "" || counter === 0 || slot === 0}
          >
            Search
          </ButtonStyle1>
        </DivStyle1>
        <ListItems
          itemList={itemList}
          setItemList={setItemList}
          setCompany={setCompany}
          setCounter={setCounter}
          setSlot={setSlot}
        />
      </div>
    </div>
  );
};

export default BookingList;
