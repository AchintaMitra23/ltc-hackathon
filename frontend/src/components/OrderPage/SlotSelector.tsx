import React from "react";
import styled from "styled-components";

interface AvailableSlots {
  [slot: string]: number;
}

const slots = [
  "12:00 to 12:15",
  "12:15 to 12:30",
  "12:30 to 12:45",
  "12:45 to 1:00",
  "1:00 to 1:15",
  "1:15 to 1:30",
  "1:30 to 1:45",
  "1:45 to 2:00",
  "Free slot 2:00 to 3:00",
];

const availableSlots: AvailableSlots = {
  "12:00 to 12:15": 30,
  "12:15 to 12:30": 28,
  "12:30 to 12:45": 0,
  "12:45 to 1:00": 30,
  "1:00 to 1:15": 20,
  "1:15 to 1:30": 30,
  "1:30 to 1:45": 18,
  "1:45 to 2:00": 30,
  "Free slot 2:00 to 3:00": 0,
};

const Container = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
`;

const CounterTitle = styled.h3`
  text-align: center;
  width: 100%;
  margin: 0 0 10px;
`;

const SlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SlotCard = styled.div<{ selected: boolean; disabled: boolean }>`
  background-color: ${({ selected }) => (selected ? "#4CAF50" : "#f0f0f0")};
  border: 1px solid #ccc;
  color: ${({ selected }) => (selected ? "#eff6ef" : "#0a0101")};;
  border-radius: 8px;
  margin: 5px;
  padding: 10px;
  width: calc(33.33% - 10px);
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const AvailabilityText = styled.div<{ available: boolean }>`
  color: ${({ available }) => (available ? "green" : "red")};
  margin-top: 5px;
  text-align: center;
`;

interface SlotSelectorProps {
  date: string;
  selectedSlot: string | null;
  onSlotSelect: (date: string, counter: string, slot: string) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  date,
  selectedSlot,
  onSlotSelect,
}) => {
  const handleSlotClick = (counter: string, slot: string) => {
    if (slot === "Free slot 2:00 to 3:00") return; // Disable the free slot
    onSlotSelect(date, counter, slot);
  };

  return (
    <Container>
      {["Counter 1", "Counter 2"].map((counter) => (
        <CounterContainer key={counter}>
          <CounterTitle>{counter}</CounterTitle>
          <SlotContainer>
            {slots.map((slot) => (
              <>
                <SlotCard
                  selected={selectedSlot === `${counter}-${slot}`}
                  disabled={
                    slot === "Free slot 2:00 to 3:00" ||
                    availableSlots[slot] === 0
                  }
                  onClick={() => handleSlotClick(counter, slot)}
                >
                  {slot}
                  <AvailabilityText available={availableSlots[slot] > 0}>
                    {slot === "Free slot 2:00 to 3:00"
                      ? "Free slot"
                      : availableSlots[slot] > 0
                      ? `${availableSlots[slot]} available`
                      : "Not available"}
                  </AvailabilityText>
                </SlotCard>
              </>
            ))}
          </SlotContainer>
        </CounterContainer>
      ))}
    </Container>
  );
};

export default SlotSelector;
