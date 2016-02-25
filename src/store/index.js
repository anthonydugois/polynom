import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "../reducers"

const middlewares = [thunk]

if (__DEV__) {
  const createLogger = require("redux-logger")
  const logger = createLogger()

  middlewares.push(logger)
}

export default (initialState) => createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares)
)
