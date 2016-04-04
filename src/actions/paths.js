import * as ActionTypes from "../constants/ActionTypes"
import { createPoint } from "./points"

const savedState = JSON.parse(localStorage.getItem("savedState"))
let newPathId = 0

if (savedState && Object.keys(savedState.pathsById).length > 0) {
  newPathId = Math.max(Object.keys(savedState.pathsById))
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
    const insertAt = project.paths.indexOf(activePaths[activePaths.length - 1])

    dispatch(setActivePaths(activePaths, false))
    dispatch(addPath(
      projectId,
      insertAt > -1 ? insertAt + 1 : project.paths.length + 1
    ))
    dispatch(createPoint(newPathId, "M", x, y, {}))
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

export function setBorderedPath(pathId, isBordered) {
  return {
    type: ActionTypes.SET_BORDERED_PATH,
    pathId,
    isBordered,
  }
}
