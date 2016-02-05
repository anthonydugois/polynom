import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducers from "../reducers"
import DevTools from "DevTools"

const enhancer = compose(applyMiddleware(thunk), DevTools.instrument())

export default (initialState) => {
  const store = createStore(reducers, initialState, enhancer)

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers").default)
    )
  }

  return store
}
