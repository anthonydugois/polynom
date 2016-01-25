import { combineReducers } from "redux"
import builder from "./builder"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  builder,
  pathsById,
  pointsById,
})

export default rootReducer
