import React from "react"
import { render } from "react-dom"
import { Router, useRouterHistory } from "react-router"
import { createHistory } from "history"
import { Provider } from "react-redux"
import createStore from "./store"
import routes from "./routes"

const savedState = JSON.parse(localStorage.getItem("savedState"))
const store = savedState ? createStore(savedState) : createStore()

// save the state in localStorage
store.subscribe(() => {
  localStorage.setItem("savedState", JSON.stringify(store.getState().present))
})

const history = useRouterHistory(createHistory)({
  basename: __PROD__ ? "/polynom" : "/",
})

render(
  <Provider store={ store }>
    <Router
      history={ history }
      routes={ routes } />
  </Provider>,
  document.querySelector("#root")
)
