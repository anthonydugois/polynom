import { default as styled } from "styled-components";

export const Main = styled.svg`
  grid-area: board;
  width: 100%;
  height: 100%;
  background: #fff;
  user-select: none;
`;

export const Defs = styled.defs``;

export const Layer = styled.g`
  opacity: ${props => (typeof props.opacity === "number" ? props.opacity : 1)};
`;

export const Selector = styled.rect`
  fill: none;
  stroke: ${props => props.theme.colors.primary["0"]};
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
`;
