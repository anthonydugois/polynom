import * as ActionTypes from "../constants/ActionTypes"
import { deletePaths } from "./paths"

const savedState = JSON.parse(localStorage.getItem("savedState"))
let newPointId = 0

if (savedState && Object.keys(savedState.pointsById).length > 0) {
  newPointId = Math.max(...Object.keys(savedState.pointsById))
}

function addPoint(pathId, insertAt, code, x, y, parameters) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_POINT,
      pointId: ++newPointId,
      code,
      x,
      y,
      parameters,
    })

    dispatch(insertPoint(pathId, insertAt, newPointId))
  }
}

export function insertPoint(pathId, insertAt, pointId) {
  return {
    type: ActionTypes.INSERT_POINT,
    pathId,
    insertAt,
    pointId,
  }
}

export function createPoint(pathId, code, x, y, parameters) {
  return (dispatch, getState) => {
    const { pathsById, pointsById } = getState().present
    const path = pathsById[pathId]

    const activePoints = path.points.filter((key) => pointsById[key].isActive)
    const insertAt = path.points.indexOf(activePoints[activePoints.length - 1])

    dispatch(setActivePoints(activePoints, false))
    dispatch(addPoint(
      pathId,
      insertAt > -1 ? insertAt + 1 : path.points.length + 1,
      code,
      x,
      y,
      parameters
    ))
  }
}

export function removePoints(pointIds) {
  return {
    type: ActionTypes.REMOVE_POINTS,
    pointIds,
  }
}

export function deletePoints(pointIds) {
  return (dispatch) => {
    dispatch(removePoints(pointIds))
    dispatch({
      type: ActionTypes.DELETE_POINTS,
      pointIds,
    })
  }
}

export function carefullyDeletePoints(pointIds) {
  return (dispatch, getState) => {
    const { pathsById, pointsById } = getState().present

    Object.keys(pathsById).forEach((pathId) => {
      const path = pathsById[pathId]
      // get remaining points
      const points = path.points.filter((key) => !pointIds.includes(key))

      if (points.length !== 0) {
        points.forEach((key, index, keys) => {
          const point = pointsById[key]
          const code = point.code.toLowerCase()
          const previous = index > 0 && pointsById[keys[index - 1]]
          const previousCode = index > 0 && previous.code.toLowerCase()

          if (index === 0 && code !== "m") {
            dispatch(setPointCode(point.id, "M"))
            dispatch(setPointParameters(point.id, {}))
          } else if (
            (code === "t" && !["q", "t"].includes(previousCode))
            || (code === "s" && !["c", "s"].includes(previousCode))
          ) {
            dispatch(setPointCode(point.id, "L"))
            dispatch(setPointParameters(point.id, {}))
          }
        })
      } else {
        dispatch(deletePaths([path.id]))
      }
    })

    dispatch(deletePoints(pointIds))
  }
}

export function setActivePoints(pointIds, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_POINTS,
    pointIds,
    isActive,
  }
}

export function setPointCode(pointId, code) {
  return {
    type: ActionTypes.SET_POINT_CODE,
    pointId,
    code,
  }
}

export function setPointX(pointId, x) {
  return {
    type: ActionTypes.SET_POINT_X,
    pointId,
    x,
  }
}

export function setPointY(pointId, y) {
  return {
    type: ActionTypes.SET_POINT_Y,
    pointId,
    y,
  }
}

export function setPointsPosition(pointIds, dx, dy, format = (n) => n) {
  return {
    type: ActionTypes.SET_POINTS_POSITION,
    pointIds,
    dx,
    dy,
    format,
  }
}

export function setPointParameters(pointId, parameters) {
  return {
    type: ActionTypes.SET_POINT_PARAMETERS,
    pointId,
    parameters,
  }
}
