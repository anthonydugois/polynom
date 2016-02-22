import * as ActionTypes from "../constants/ActionTypes"
import { createPoint } from "./points"

let newPathId = 0

function addPath(projectId, insertAt) {
  return {
    type: ActionTypes.ADD_PATH,
    pathId: ++newPathId,
    projectId,
    insertAt,
  }
}

export function createPath(projectId, x, y) {
  return (dispatch, getState) => {
    const { projectsById, pathsById } = getState()

    // determine the position of the new path
    const insertAt = projectsById[projectId].paths.reduce(
      (acc, key, index) => pathsById[key].isActive ? index + 1 : acc,
      0
    )

    dispatch(deactivatePaths())
    dispatch(addPath(projectId, insertAt))
    dispatch(createPoint(newPathId, "M", x, y, {}))
  }
}

export function deactivatePaths() {
  return {
    type: ActionTypes.DEACTIVATE_PATHS,
  }
}

export function setActivePaths(pathIds, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_PATHS,
    pathIds,
    isActive,
  }
}

export function removePaths(pathIds) {
  return {
    type: ActionTypes.REMOVE_PATHS,
    pathIds,
  }
}

export function setPathName(pathId, name) {
  return {
    type: ActionTypes.SET_PATH_NAME,
    pathId,
    name,
  }
}

export function setRelativePath(pathId, isRelative) {
  return {
    type: ActionTypes.SET_RELATIVE_PATH,
    pathId,
    isRelative,
  }
}

export function setClosedPath(pathId, isClosed) {
  return {
    type: ActionTypes.SET_CLOSED_PATH,
    pathId,
    isClosed,
  }
}

export function setFilledPath(pathId, isFilled) {
  return {
    type: ActionTypes.SET_FILLED_PATH,
    pathId,
    isFilled,
  }
}
