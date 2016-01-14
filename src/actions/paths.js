import * as ActionTypes from "../constants/ActionTypes"
import { addPoint, removePoint, M, L, Q, T, C, S, A } from "./points"

export function addPath(pathId, x, y) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.ADD_PATH,
      pathId,
    })

    dispatch(addPoint(pathId, "M", x, y, false, false, {}))
    dispatch(setActivePath(pathId))
  }
}

export function removePath(pathId) {
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
}

export function setActivePath(pathId) {
  return {
    type: ActionTypes.SET_ACTIVE_PATH,
    pathId,
  }
}

export function setRelative(pathId, isRelative) {
  return {
    type: ActionTypes.SET_RELATIVE,
    pathId,
    isRelative,
  }
}

export function setClosed(pathId, isClosed) {
  return {
    type: ActionTypes.SET_CLOSED,
    pathId,
    isClosed,
  }
}

export function setFilled(pathId, isFilled) {
  return {
    type: ActionTypes.SET_FILLED,
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
