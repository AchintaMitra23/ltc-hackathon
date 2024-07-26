import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import {
  RadioButtonContainer,
  Preferencelabel,
  Radiolabel,
  CounterContainer,
  CounterTitle,
  SlotContainer,
  SlotCard,
  AvailabilityText,
  Header,
} from "../../styles/SlotSelector.styled";

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
    preference: string
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
    selectedSlot?.preference || "veg"
  );

  const handleSlotClick = (counter: string, slot: string) => {
    const slotData = Object.values(availableSlots[counter]).find(
      (slotItem) => slotItem.slot_name === slot
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
        newPreference
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
