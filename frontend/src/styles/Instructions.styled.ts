import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

export const InstructionsContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 80%;
  margin: 20px auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
  text-decoration: underline;
`;

export const InfoIcon = styled(FaInfoCircle)`
  margin-right: 10px;
  color: #007bff;
`;

export const InstructionList = styled.ul`
  list-style-type: none;
  padding: 2%;
`;

export const InstructionItem = styled.li`
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

export const InstructionText = styled.span`
  margin-left: 10px;
`;
