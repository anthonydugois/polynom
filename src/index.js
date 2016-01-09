import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import App from "App"
import rootReducer from "./reducers"

const _createStore = applyMiddleware(thunkMiddleware)(createStore)
const store = _createStore(rootReducer)

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector("#app")
)
