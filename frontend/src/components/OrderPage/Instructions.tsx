import React from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

const InstructionsContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 80%;
  margin: 20px auto;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
  text-decoration: underline;
`;

const InfoIcon = styled(FaInfoCircle)`
  margin-right: 10px;
  color: #007bff;
`;

const InstructionList = styled.ul`
  list-style-type: none;
  padding: 2%;
`;

const InstructionItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;

  /* &:before {
    content: "•";
    color: #007bff;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  } */
`;

const InstructionText = styled.span`
  margin-left: 10px;
`;

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
