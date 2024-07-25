/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import MultiDatePicker from "../components/OrderPage/MultiDatePicker";
import SlotSelector from "../components/OrderPage/SlotSelector";
import { createOrder } from "../apis/createOrder";
import Instructions from "../components/OrderPage/Instructions";
import { useNavigate } from "react-router-dom";
import {
  BookingContainer,
  HorizontalLine,
  InstructionContainer,
  PageContainer,
  PageTitle,
  ShowselectedDate,
  SubmitButton,
} from "../styles/Bookings.styled";
import { fetchDateOrders } from "../apis/slotsService";

interface BookingProps {
  employeeId: string;
}

interface SelectedSlots {
  [key: string]: { counter: string; slot: string; preference: string } | null;
}

interface AvailableSlots {
  [counter: string]: {
    [id: number]: { order_count: number; slot_name: string };
  };
}

// Define availableSlots here
const availableSlots: AvailableSlots = {
  "Counter 1": {
    1: { order_count: 30, slot_name: "12:00 to 12:15" },
    2: { order_count: 30, slot_name: "12:15 to 12:30" },
    3: { order_count: 30, slot_name: "12:30 to 12:45" },
    4: { order_count: 30, slot_name: "12:45 to 1:00" },
    5: { order_count: 30, slot_name: "1:00 to 1:15" },
    6: { order_count: 30, slot_name: "1:15 to 1:30" },
    7: { order_count: 30, slot_name: "1:30 to 1:45" },
    8: { order_count: 30, slot_name: "1:45 to 2:00" },
    9: { order_count: 0, slot_name: "2:00 to 3:00" },
  },
  "Counter 2": {
    10: { order_count: 30, slot_name: "12:00 to 12:15" },
    11: { order_count: 30, slot_name: "12:15 to 12:30" },
    12: { order_count: 30, slot_name: "12:30 to 12:45" },
    13: { order_count: 30, slot_name: "12:45 to 1:00" },
    14: { order_count: 30, slot_name: "1:00 to 1:15" },
    15: { order_count: 30, slot_name: "1:15 to 1:30" },
    16: { order_count: 30, slot_name: "1:30 to 1:45" },
    17: { order_count: 30, slot_name: "1:45 to 2:00" },
    18: { order_count: 0, slot_name: "2:00 to 3:00" },
  },
};

const Bookings = ({ employeeId }: BookingProps) => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>({});
  const [fetchSlots,setFecthSlots]=useState<AvailableSlots>({});
  const navigate: any = useNavigate();

  const handleDateChange = (dates: DateObject[]) => {
    setSelectedDates(dates);
    const updatedSlots: SelectedSlots = {};
    dates.forEach((date) => {
      updatedSlots[date.format("YYYY-MM-DD")] = null;
    });
    setSelectedSlots(updatedSlots);
  };

  const handleSlotSelect = (
    date: string,
    counter: string,
    slot: string,
    preference: string
  ) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [date]: { counter, slot, preference },
    }));
  };

  const GetAvailableslots = async(selectedDatesbyuser: any) => {
    selectedDatesbyuser.map((date: any) => {
      const formattedDate = date.format("YYYY-MM-DD");
      console.log(formattedDate, "formattedDate");
    });
    if(selectedDatesbyuser){
      const data:any = await fetchDateOrders("LTC", selectedDatesbyuser);
      if(data?.orders){
        setFecthSlots(data.orders)
      }
    }
  };
  useEffect(() => {
    if (selectedDates?.length > 0) {
      GetAvailableslots(selectedDates);
    }
  }, [selectedDates]);
  const handleSubmit = async () => {
    const results = selectedDates
      .map((date) => {
        const formattedDate = date.format("YYYY-MM-DD");
        const slot = selectedSlots[formattedDate];

        if (slot) {
          // Get the slot ID based on the selected counter and slot name
          const slotId = Object.keys(availableSlots[slot.counter]).find(
            (id) =>
              availableSlots[slot.counter][parseInt(id, 10)].slot_name ===
              slot.slot
          );

          return {
            emp_id: employeeId,
            counter_id: slot.counter,
            slot_id: slotId ? parseInt(slotId, 10) : null,
            order_date: formattedDate,
            order_status: "active",
            preference: slot.preference,
            token_no: `${employeeId}-${formattedDate}-${slot.counter}-slotTime:${slot.slot}-${slot.preference}`,
          };
        }
        return null;
      })
      .filter((result) => result !== null);

    console.log("Submission Results:", results);
    if (results && results.length > 0) {
      const bookOrders: any = await createOrder(results, true);
      console.log(bookOrders, "bookOrders");
      alert("your slot booked sucessfully!");
      navigate("/history");
    }
    // Handle further submission logic here, e.g., sending results to the server
  };

  return (
    <BookingContainer>
      <PageTitle>Book your lunch box</PageTitle>
      <HorizontalLine />
      <MultiDatePicker
        selectedDates={selectedDates}
        onChange={handleDateChange}
      />
      {selectedDates?.length > 0 &&
        selectedDates.map((date) => {
          const formattedDate = date.format("YYYY-MM-DD");
          return (
            <PageContainer key={formattedDate}>
              <ShowselectedDate>{formattedDate}</ShowselectedDate>
              <SlotSelector
                date={formattedDate}
                selectedSlot={selectedSlots[formattedDate]}
                onSlotSelect={handleSlotSelect}
                availableSlots={fetchSlots[formattedDate]||availableSlots}
              />
            </PageContainer>
          );
        })}
      {selectedDates?.length === 0 && (
        <InstructionContainer>
          <Instructions />
        </InstructionContainer>
      )}
      {selectedDates?.length > 0 && (
        <SubmitButton
          disabled={Object.values(selectedSlots).some((slot) => slot === null)}
          onClick={handleSubmit}
        >
          Submit
        </SubmitButton>
      )}
    </BookingContainer>
  );
};

export default Bookings;
