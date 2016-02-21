import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"
import grid from "./grid"
import projectsById from "./projects"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  routing: routeReducer,
  grid,
  projectsById,
  pathsById,
  pointsById,
})

export default rootReducer
