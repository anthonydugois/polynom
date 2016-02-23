import { combineReducers } from "redux"
import projectsById from "./projects"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  projectsById,
  pathsById,
  pointsById,
})

export default rootReducer
