import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "../reducers"
import DevTools from "DevTools"

const _createStore = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore)

export default (initialState) => {
  const store = _createStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers").default)
    )
  }

  return store
}
