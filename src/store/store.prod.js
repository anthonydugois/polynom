import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { browserHistory } from "react-router"
import { syncHistory } from "react-router-redux"
import reducers from "../reducers"

const history = syncHistory(browserHistory)
const enhancer = applyMiddleware(thunk, history)

export default (initialState) => createStore(reducers, initialState, enhancer)
