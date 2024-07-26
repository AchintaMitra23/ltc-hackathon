import React from "react";
import {
  InstructionsContainer,
  TitleContainer,
  Title,
  InstructionList,
  InstructionItem,
  InfoIcon,
  InstructionText,
} from "../../styles/Instructions.styled";

const Instructions: React.FC = () => {
  return (
    <InstructionsContainer>
      <TitleContainer>
        <Title>How to book slot for your lunch</Title>
      </TitleContainer>
      <InstructionList>
        <InstructionItem>
          <InfoIcon />
          <InstructionText>
            Select the desired dates using the date picker.
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InfoIcon />
          <InstructionText>
            Choose your food preference (Veg/Non-Veg).
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InfoIcon />
          <InstructionText>
            Select an available time slot from the counters.
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InfoIcon />
          <InstructionText>
            Ensure all selections are made for each selected date.
          </InstructionText>
        </InstructionItem>
        <InstructionItem>
          <InfoIcon />
          <InstructionText>
            Click the "Submit" button to confirm your booking.
          </InstructionText>
        </InstructionItem>
      </InstructionList>
    </InstructionsContainer>
  );
};

export default Instructions;
