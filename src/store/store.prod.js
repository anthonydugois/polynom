import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "../reducers"

const enhancer = applyMiddleware(thunk)

export default (initialState) => createStore(reducers, initialState, enhancer)
