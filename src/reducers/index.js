import { combineReducers } from "redux"
import projects from "./projects"
import grid from "./grid"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  projects,
  grid,
  pathsById,
  pointsById,
})

export default rootReducer
