import { default as React, Component } from "react";
import { default as styled } from "styled-components";

import { DIRECTION } from "../constants";

const Container = styled.svg`
  grid-area: ${props => props.area};
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.gray["10"]};
`;

const Line = styled.line`
  stroke: black;
  stroke-width: 1px;
`;

class Rule extends Component {
  static defaultProps = {
    direction: DIRECTION.HORIZONTAL,
    pan: 0,
    size: 0,
    step: 0,
  };

  getArea = direction => {
    switch (direction) {
      case DIRECTION.HORIZONTAL:
        return "hrule";

      case DIRECTION.VERTICAL:
        return "vrule";

      default:
        return null;
    }
  };

  getViewBox = direction => {
    switch (direction) {
      case DIRECTION.HORIZONTAL:
        return `${this.props.pan} 0 ${this.props.size} 20`;

      case DIRECTION.VERTICAL:
        return `0 ${this.props.pan} 20 ${this.props.size}`;

      default:
        return null;
    }
  };

  renderPattern = direction => {
    switch (direction) {
      case DIRECTION.HORIZONTAL:
        return (
          <pattern
            id={this.getArea(direction)}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={this.props.step}
            height="100%"
          >
            <Line x1={0} y1="0%" x2={0} y2="100%" />
          </pattern>
        );

      case DIRECTION.VERTICAL:
        return (
          <pattern
            id={this.getArea(direction)}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
            width="100%"
            height={this.props.step}
          >
            <Line x1="0%" y1={0} x2="100%" y2={0} />
          </pattern>
        );

      default:
        return null;
    }
  };

  renderRule = direction => {
    switch (direction) {
      case DIRECTION.HORIZONTAL:
        return (
          <rect
            x={this.props.pan}
            y={0}
            width="100%"
            height="100%"
            fill={`url(#${this.getArea(direction)})`}
          />
        );

      case DIRECTION.VERTICAL:
        return (
          <rect
            x={0}
            y={this.props.pan}
            width="100%"
            height="100%"
            fill={`url(#${this.getArea(direction)})`}
          />
        );

      default:
        return null;
    }
  };

  render() {
    return (
      <Container
        area={this.getArea(this.props.direction)}
        viewBox={this.getViewBox(this.props.direction)}
      >
        <defs>{this.renderPattern(this.props.direction)}</defs>
        {this.renderRule(this.props.direction)}
      </Container>
    );
  }
}

export default Rule;
