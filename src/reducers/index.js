import { combineReducers } from "redux"
import builder from "./builder"
import paths from "./paths"
import points from "./points"

const rootReducer = combineReducers({
  builder,
  paths,
  points,
})

export default rootReducer
