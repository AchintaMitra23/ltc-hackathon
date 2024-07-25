import { styled } from "styled-components";

export const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
`;
export const PageTitle = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bolder;
  color: green;
  padding-top: 2%;
  align-items: center;
`;
export const PageContainer = styled.div`
  border: 1px solid #000;
  margin: 1%;
  border-radius: 5px;
`;
export const InstructionContainer = styled.div`
  margin: 1%;
  width: 100%;
`;
export const SubmitButton = styled.button`
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
export const ShowselectedDate = styled.div`
  padding-top: 1%;
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  color: gray;
`;
export const HorizontalLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #190303; /* Customize the color */
  margin: 10px 0; /* Add some spacing */
`;