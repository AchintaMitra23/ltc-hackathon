import { styled } from "styled-components";

export const Container = styled.div`
  padding: 1%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CounterTitle = styled.h3`
  margin: 0;
`;

export const RadioButtonContainer = styled.div`
  padding-left: 1%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

export const SlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SlotCard = styled.div<{ selected: boolean; disabled: boolean }>`
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

export const Preferencelabel = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

export const Radiolabel = styled.label`
  font-size: 16px;
  color: gray;
`;

export const AvailabilityText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "available",
})<{ available: boolean }>`
  color: ${({ available }) => (available ? "green" : "red")};
  margin-top: 5px;
  text-align: center;
`;
