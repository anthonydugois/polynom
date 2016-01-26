import * as ActionTypes from "../constants/ActionTypes"
import { createPoint } from "./points"

let newPathId = 0
export function createPath(x, y) {
  return (dispatch, getState) => {
    const { builder, pathsById } = getState()

    // determine the position of the new path
    const insertAt = builder.paths.reduce((acc, key, index) => {
      return pathsById[key].isActive ? index + 1 : acc
    }, 0)

    newPathId++

    // add a path to state
    dispatch(addPath(newPathId, insertAt))
    // create the first point
    dispatch(createPoint(newPathId, "M", x, y, {}))
  }
}

export function deletePath(pathId) {
  return (dispatch, getState) => {
    const { builder, pathsById } = getState()
    const index = builder.paths.indexOf(pathId)

    if (pathsById[pathId].isActive && index > -1) {
      const activatePathId = index === 0 ?
        builder.paths[index + 1] : builder.paths[index - 1]

      dispatch(setActivePath(activatePathId))
    }

    dispatch(removePath(pathId))
  }
}

function addPath(pathId, insertAt) {
  return {
    type: ActionTypes.ADD_PATH,
    pathId,
    insertAt,
  }
}

export function removePath(pathId) {
  return {
    type: ActionTypes.REMOVE_PATH,
    pathId,
  }
}

export function setPathName(pathId, name) {
  return {
    type: ActionTypes.SET_PATH_NAME,
    pathId,
    name,
  }
}

export function setActivePath(pathId) {
  return {
    type: ActionTypes.SET_ACTIVE_PATH,
    pathId,
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
