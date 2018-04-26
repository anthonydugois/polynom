import { default as styled } from "styled-components";

export const GridDef = styled.pattern.attrs({
  id: "grid",
  patternUnits: "userSpaceOnUse",
})``;

export const GridPoint = styled.circle`
  fill: ${props => props.theme.colors.gray["2"]};
`;

export const GridContainer = styled.rect`
  fill: url(#grid);
`;
