import React from "react"
import { render } from "react-dom"
import { Router, browserHistory } from "react-router"
import Root from "Root"
import store from "./store"
import routes from "./routes"

render(
  <Root store={ store() }>
    <Router
      history={ browserHistory }
      routes={ routes } />
  </Root>,
  document.querySelector("#root")
)
