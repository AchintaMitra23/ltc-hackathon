import React, { useState } from "react";
import styled from "styled-components";
import MultiDatePicker from "./MultiDatePicker";
import SlotSelector from "./SlotSelector";
import { DateObject } from "react-multi-date-picker";

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
`;
const PageTitle = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bolder;
  color: green;
  padding-top: 2%;
  align-items: center;
`;
const PageContainer = styled.div`
  border: 1px solid #000;
  margin: 1%;
  border-radius: 5px;
`;
const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  width: 100%;
  margin-left: 10%;
  margin-right: 10%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;
const ShowselectedDate = styled.div`
  padding-top: 1%;
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: gray;
`;
const HorizontalLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #190303; /* Customize the color */
  margin: 10px 0; /* Add some spacing */
`;
interface BookingProps {
  employeeId: string;
}

interface SelectedSlots {
  [key: string]: { counter: string; slot: string } | null;
}

const Booking: React.FC<BookingProps> = ({ employeeId }) => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>({});

  const handleDateChange = (dates: DateObject[]) => {
    setSelectedDates(dates);
    const updatedSlots: SelectedSlots = {};
    dates.forEach((date) => {
      updatedSlots[date.format("YYYY-MM-DD")] = null;
    });
    setSelectedSlots(updatedSlots);
  };

  const handleSlotSelect = (date: string, counter: string, slot: string) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [date]: { counter, slot },
    }));
  };

  const handleSubmit = () => {
    selectedDates.forEach((date) => {
      const formattedDate = date.format("YYYY-MM-DD");
      const slot = selectedSlots[formattedDate];
      if (slot) {
        const token = `${employeeId}-${formattedDate}-${slot.counter}-${slot.slot}`;
        console.log("Generated Token:", token);
        // Handle further token submission logic here
      }
    });
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
                selectedSlot={
                  selectedSlots[formattedDate]
                    ? `${selectedSlots[formattedDate]!.counter}-${
                        selectedSlots[formattedDate]!.slot
                      }`
                    : null
                }
                onSlotSelect={handleSlotSelect}
              />
            </PageContainer>
          );
        })}
      <SubmitButton
        disabled={Object.values(selectedSlots).some((slot) => slot === null)}
        onClick={handleSubmit}
      >
        Submit
      </SubmitButton>
    </BookingContainer>
  );
};

export default Booking;
