import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "../reducers"

const _createStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)

export default (initialState) => _createStore(rootReducer, initialState)
