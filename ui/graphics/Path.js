import { default as styled } from "styled-components";

export const Path = styled.path`
  fill: none;
  stroke: ${props => props.theme.colors.gray["0"]};
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
`;

export const HighlightPath = styled(Path)`
  stroke: ${props => props.theme.colors.primary["0"]};
  stroke-width: 2px;
`;

export const Segment = styled.g`
  cursor: pointer;
`;

export const SegmentPoint = styled.circle`
  fill: ${props =>
    props.isSelected ? props.theme.colors.primary["0"] : "#fff"};
  stroke: ${props =>
    props.isSelected
      ? props.theme.colors.primary["0"]
      : props.theme.colors.gray["0"]};
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
`;
