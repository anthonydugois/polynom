import { combineReducers } from "redux"
import grid from "./grid"
import projectsById from "./projects"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  grid,
  projectsById,
  pathsById,
  pointsById,
})

export default rootReducer
