import * as ActionTypes from "../constants/ActionTypes"
import { createPoint } from "./points"

export function createPath(x, y) {
  return (dispatch, getState) => {
    const { pathsById } = getState().paths
    const pathId = Math.max(...Object.keys(pathsById)) + 1

    // add a path to state
    dispatch(addPath(pathId))
    // create the first point
    dispatch(createPoint(pathId, "M", x, y, {}))
  }
}

export function deletePath(pathId) {
  return (dispatch, getState) => {
    const { paths, pathsById } = getState().paths
    const index = paths.indexOf(pathId)

    if (pathsById[pathId].isActive && index > -1) {
      const activatePathId = index === 0 ?
        paths[index + 1] : paths[index - 1]

      dispatch(activatePath(activatePathId))
    }

    dispatch(removePath(pathId))
  }
}

export function activatePath(pathId) {
  return (dispatch, getState) => {
    const { paths } = getState().paths

    paths.forEach((id) => dispatch(setActivePath(id, false)))
    dispatch(setActivePath(pathId, true))
  }
}

function addPath(pathId) {
  return {
    type: ActionTypes.ADD_PATH,
    pathId,
  }
}

export function removePath(pathId) {
  return {
    type: ActionTypes.REMOVE_PATH,
    pathId,
  }
}

function setActivePath(pathId, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_PATH,
    pathId,
    isActive,
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

/* export function getPathCode(path) {
  let code = path.points.reduce((acc, point, index, points) => {
    const previousPoint = index > 0 ? points[index - 1] : false

    switch (point.code.toLowerCase()) {
    case "m":
      return acc + M(point, previousPoint, path.isClosed)

    case "l":
      return acc + L(point, previousPoint)

    case "q":
      return acc + Q(point, previousPoint)

    case "t":
      return acc + T(point, previousPoint)

    case "c":
      return acc + C(point, previousPoint)

    case "s":
      return acc + S(point, previousPoint)

    case "a":
      return acc + A(point, previousPoint)

    default:
      return ""
    }
  }, "")

  if (path.isClosed) {
    code += "z"
  }

  return code
} */
