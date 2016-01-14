import * as ActionTypes from "../constants/ActionTypes"
import { addPoint, removePoint } from "./points"

export function addPath(x, y) {
  return (dispatch, getState) => {
    const pathId = Math.max(...Object.keys(getState().paths)) + 1

    dispatch({
      type: ActionTypes.ADD_PATH,
      pathId,
    })

    // add the first point
    dispatch(addPoint(pathId, "M", x, y, {}))
    // activate the new path
    dispatch(activatePath(pathId))
  }
}

/* export function removePath(pathId) {
  return (dispatch, getState) => {
    // first remove all related points
    getState().paths[pathId].points.forEach((pointId) => {
      dispatch(removePoint(pathId, pointId))
    })

    dispatch({
      type: ActionTypes.REMOVE_PATH,
      pathId,
    })
  }
} */

export function activatePath(pathId) {
  return (dispatch, getState) => {
    const { paths } = getState()

    Object.keys(paths).forEach((key) =>
      dispatch(setActivePath(paths[key].id, false)))

    dispatch(setActivePath(pathId, true))
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

export function getPathCode(path) {
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
}
