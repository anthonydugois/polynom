import React from "react"
import { render } from "react-dom"
import { Router, browserHistory } from "react-router"
import { Provider } from "react-redux"
import createStore from "./store"
import routes from "./routes"

localStorage.clear()

const savedState = JSON.parse(localStorage.getItem("savedState"))
const store = savedState ? createStore(savedState) : createStore()

// save the state in localStorage
store.subscribe(() => {
  localStorage.setItem("savedState", JSON.stringify(store.getState().present))
})

render(
  <Provider store={ store }>
    <Router
      history={ browserHistory }
      routes={ routes } />
  </Provider>,
  document.querySelector("#root")
)
