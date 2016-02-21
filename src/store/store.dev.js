import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { browserHistory } from "react-router"
import { syncHistory } from "react-router-redux"
import reducers from "../reducers"
import DevTools from "DevTools"

const history = syncHistory(browserHistory)
const enhancer = compose(
  applyMiddleware(thunk, history),
  DevTools.instrument()
)

export default (initialState) => {
  const store = createStore(reducers, initialState, enhancer)

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers").default)
    )
  }

  history.listenForReplays(store)

  return store
}
