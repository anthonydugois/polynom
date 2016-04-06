import * as ActionTypes from "../constants/ActionTypes"
import { createPoint, deletePoints } from "./points"

const savedState = JSON.parse(localStorage.getItem("savedState"))
let newPathId = 0

if (savedState && Object.keys(savedState.pathsById).length > 0) {
  newPathId = Math.max(...Object.keys(savedState.pathsById))
}

function addPath(projectId, insertAt) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_PATH,
      pathId: ++newPathId,
    })

    dispatch(insertPath(projectId, insertAt, newPathId))
  }
}

export function insertPath(projectId, insertAt, pathId) {
  return {
    type: ActionTypes.INSERT_PATH,
    projectId,
    insertAt,
    pathId,
  }
}

export function createPath(projectId, x, y) {
  return (dispatch, getState) => {
    const { projectsById, pathsById } = getState().present
    const project = projectsById[projectId]

    const activePaths = project.paths.filter((key) => pathsById[key].isActive)
    const index = project.paths.indexOf(activePaths[activePaths.length - 1])
    const insertAt = index > -1 ? index + 1 : project.paths.length + 1

    dispatch(setActivePaths(activePaths, false))
    dispatch(addPath(projectId, insertAt))
    dispatch(setActivePaths([newPathId], true))
    dispatch(createPoint(newPathId, "M", x, y, {}))
  }
}

export function importPath(projectId, insertAt, parsedCode) {
  return (dispatch) => {
    const { isClosed, isRelative, points } = parsedCode

    dispatch(addPath(projectId, insertAt))
    points.forEach((point) => dispatch(createPoint(newPathId, ...point)))
    dispatch(setClosedPath(newPathId, isClosed))
    dispatch(setRelativePath(newPathId, isRelative))
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

export function deletePaths(pathIds) {
  return (dispatch, getState) => {
    const { pathsById } = getState().present

    pathIds.forEach((key) => dispatch(deletePoints(pathsById[key].points)))

    dispatch(removePaths(pathIds))
    dispatch({
      type: ActionTypes.DELETE_PATHS,
      pathIds,
    })
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

export function setBorderedPath(pathId, isBordered) {
  return {
    type: ActionTypes.SET_BORDERED_PATH,
    pathId,
    isBordered,
  }
}
