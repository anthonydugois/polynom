import React from "react"
import { render } from "react-dom"
import { Router, browserHistory } from "react-router"
import { Provider } from "react-redux"
import store from "./store"
import routes from "./routes"

render(
  <Provider store={ store() }>
    <Router
      history={ browserHistory }
      routes={ routes } />
  </Provider>,
  document.querySelector("#root")
)
