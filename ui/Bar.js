import { default as React, Component } from "react";
import { default as styled } from "styled-components";

const Nav = styled.nav`
  height: 4.5rem;
  background: ${props => props.theme.colors.gray["1"]};
`;

class Bar extends Component {
  render() {
    return <Nav />;
  }
}

export default Bar;
