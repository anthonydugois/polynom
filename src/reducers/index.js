import { combineReducers } from "redux"
import undoable, { includeAction } from "redux-undo"
import { UPDATE_PROJECT } from "../constants/ActionTypes"
import settings from "./settings"
import projectsById from "./projects"
import pathsById from "./paths"
import pointsById from "./points"

const rootReducer = combineReducers({
  settings,
  projectsById,
  pathsById,
  pointsById,
})

export default undoable(rootReducer, {
  limit: 50,
  filter: includeAction(UPDATE_PROJECT),
})
