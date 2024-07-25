import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CounterTitle = styled.h3`
  margin: 0;
`;

const RadioButtonContainer = styled.div`
  padding-left: 1%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const SlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SlotCard = styled.div<{ selected: boolean; disabled: boolean }>`
  background-color: ${({ selected }) => (selected ? "#4CAF50" : "#f0f0f0")};
  border: 1px solid #ccc;
  color: ${({ selected }) => (selected ? "#eff6ef" : "#0a0101")};
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

const Preferencelabel = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const Radiolabel = styled.label`
  font-size: 16px;
  color: gray;
`;

const AvailabilityText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "available",
})<{ available: boolean }>`
  color: ${({ available }) => (available ? "green" : "red")};
  margin-top: 5px;
  text-align: center;
`;
interface AvailableSlots {
  [counter: string]: {
    [id: number]: { order_count: number; slot_name: string };
  };
}

interface SlotSelectorProps {
  date: string;
  selectedSlot: { counter: string; slot: string; preference: string } | null;
  onSlotSelect: (
    date: string,
    counter: string,
    slot: string,
    preference: string,
  ) => void;
  availableSlots: AvailableSlots;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  date,
  selectedSlot,
  onSlotSelect,
  availableSlots,
}) => {
  const [preference, setPreference] = useState<string>(
    selectedSlot?.preference || "veg",
  );

  const handleSlotClick = (counter: string, slot: string) => {
    const slotData = Object.values(availableSlots[counter]).find(
      (slotItem) => slotItem.slot_name === slot,
    );
    if (slotData?.order_count === 0) return; // Disable if slot is not available
    onSlotSelect(date, counter, slot, preference);
  };

  const handlePreferenceChange = (newPreference: string) => {
    setPreference(newPreference);
    if (selectedSlot) {
      onSlotSelect(
        date,
        selectedSlot.counter,
        selectedSlot.slot,
        newPreference,
      );
    }
  };

  return (
    <Container>
      <RadioButtonContainer>
        <Preferencelabel>Food preference:</Preferencelabel>
        <Radiolabel>
          <input
            type="radio"
            name={`foodType-${date}`}
            value="veg"
            checked={preference === "veg"}
            onChange={() => handlePreferenceChange("veg")}
          />
          Veg
        </Radiolabel>
        <Radiolabel>
          <input
            type="radio"
            name={`foodType-${date}`}
            value="nonveg"
            checked={preference === "nonveg"}
            onChange={() => handlePreferenceChange("nonveg")}
          />
          Non-Veg
        </Radiolabel>
      </RadioButtonContainer>
      <Row>
        {Object.keys(availableSlots).map((counter) => (
          <CounterContainer key={counter}>
            <Header>
              <CounterTitle>{counter}</CounterTitle>
            </Header>
            <SlotContainer>
              {Object.values(availableSlots[counter]).map((slotItem) => (
                <SlotCard
                  key={slotItem.slot_name}
                  selected={
                    selectedSlot?.counter === counter &&
                    selectedSlot?.slot === slotItem.slot_name &&
                    selectedSlot?.preference === preference
                  }
                  disabled={slotItem.order_count === 0}
                  onClick={() => handleSlotClick(counter, slotItem.slot_name)}
                >
                  {slotItem.slot_name}
                  <AvailabilityText
                    available={slotItem.order_count > 0 ? true : false}
                  >
                    {slotItem.order_count > 0
                      ? `${slotItem.order_count} available`
                      : "Not available"}
                  </AvailabilityText>
                </SlotCard>
              ))}
            </SlotContainer>
          </CounterContainer>
        ))}
      </Row>
    </Container>
  );
};

export default SlotSelector;
