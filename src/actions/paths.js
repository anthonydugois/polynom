import * as types from "../constants/ActionTypes"
import { M, L, Q, T, C, S, A } from "./points"

export function getPathById(paths, id) {
  const index = paths.map((path) => path.id).indexOf(id)

  return {
    index,
    path: paths[index],
  }
}

export function addPath(x, y) {
  return {
    type: types.ADD_PATH,
    x,
    y,
  }
}

export function removePath(id) {
  return (dispatch, getState) => {
    const { paths } = getState()
    const { index, path } = getPathById(paths, id)

    if (paths.length > 1) {
      if (path.isActive) {
        const activeId = index === 0 ?
          paths[index + 1].id : paths[index - 1].id

        dispatch(setActivePath(activeId))
      }

      dispatch({
        type: types.REMOVE_PATH,
        id,
      })
    }
  }
}

export function setActivePath(id) {
  return {
    type: types.SET_ACTIVE_PATH,
    id,
  }
}

export function setRelative(id, isRelative) {
  return {
    type: types.SET_RELATIVE,
    id,
    isRelative,
  }
}

export function setClosed(id, isClosed) {
  return {
    type: types.SET_CLOSED,
    id,
    isClosed,
  }
}

export function setFilled(id, isFilled) {
  return {
    type: types.SET_FILLED,
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
