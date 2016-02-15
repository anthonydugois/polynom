import { combineReducers } from "redux"
import builder from "./builder"
import grid from "./grid"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  builder,
  grid,
  pathsById,
  pointsById,
})

export default rootReducer
