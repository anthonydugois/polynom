import * as ActionTypes from "../constants/ActionTypes"
import { addPoint, removePoint, M, L, Q, T, C, S, A } from "./points"

export function addPath(x, y) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.ADD_PATH,
    })

    // then insert a default point
    const id = Math.max(...Object.keys(getState().paths))

    dispatch(addPoint(id, "M", x, y, false, false, {}))
  }
}

export function removePath(id) {
  return (dispatch, getState) => {
    // first remove all related points
    getState().paths[id].points.forEach((pointId) => {
      dispatch(removePoint(id, pointId))
    })

    dispatch({
      type: ActionTypes.REMOVE_PATH,
      id,
    })
  }
}

export function setActivePath(id) {
  return {
    type: ActionTypes.SET_ACTIVE_PATH,
    id,
  }
}

export function setRelative(id, isRelative) {
  return {
    type: ActionTypes.SET_RELATIVE,
    id,
    isRelative,
  }
}

export function setClosed(id, isClosed) {
  return {
    type: ActionTypes.SET_CLOSED,
    id,
    isClosed,
  }
}

export function setFilled(id, isFilled) {
  return {
    type: ActionTypes.SET_FILLED,
    id,
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
