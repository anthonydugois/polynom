import { combineReducers } from "redux"
import undoable, { includeAction } from "redux-undo"
import { HISTORY_TYPES } from "../constants/ActionTypes"
import projectsById from "./projects"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  projectsById,
  pathsById,
  pointsById,
})

export default undoable(rootReducer, {
  limit: 50,
  filter: includeAction(HISTORY_TYPES),
})
