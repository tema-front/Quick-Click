import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { ICurrentFieldElementStyles } from "./Game.types";

interface FieldElementProps {
  elementStyles: ICurrentFieldElementStyles;
}

export const GameWrapper = styled(Stack)`
  padding: 6%;
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const GameFieldWrapper = styled(Stack)`
  padding: 6%;
  border: 6px dotted #d32f2f;
  border-radius: 32px;
  height: 100%;
  width: 100%;
  max-width: 1000px;
`;

export const GameField = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const FieldElement = styled(Stack)<FieldElementProps>`
  position: absolute;
  top: ${(props) => props.elementStyles?.top};
  left: ${(props) => props.elementStyles?.left};
  transform: rotate(${(props) => props.elementStyles?.rotation})
    scale(${(props) => props.elementStyles?.scale});
  padding: 8px;

  &:hover {
    cursor: pointer;
  }

  // & svg {
  //   fill: ;
  // }
`;
