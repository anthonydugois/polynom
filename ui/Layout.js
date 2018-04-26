import { default as React, Component } from "react";
import { ThemeProvider, injectGlobal } from "styled-components";

import { default as main } from "../themes/main";

injectGlobal`
  @import url("https://fonts.googleapis.com/css?family=Fira+Mono:400,500|Roboto:300,400,400i,500");

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${main.colors.gray["12"]};
    line-height: 1;
    font-size: 1.4rem;
    color: ${main.colors.gray["0"]};
  }

  [tabindex="-1"]:focus {
    outline: 0;
  }

  .Resizer {
    background: ${main.colors.gray["2"]};
    opacity: 1;

    &:hover {
      transition: none;
    }

    &.vertical {
      width: 0.5rem;
      margin: 0;
      border: none;

      &:hover {
        border: none;
      }
    }
  }
`;

class Layout extends Component {
  render() {
    return <ThemeProvider theme={main}>{this.props.children}</ThemeProvider>;
  }
}

export default Layout;
