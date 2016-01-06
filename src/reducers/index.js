import { combineReducers } from "redux"
import builder from "./builder"
import paths from "./paths"

const rootReducer = combineReducers({
  builder,
  paths,
})

export default rootReducer
