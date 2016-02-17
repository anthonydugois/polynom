import * as ActionTypes from "../constants/ActionTypes"
import { activePathsSelector } from "../selectors"
import { removePaths } from "./paths"

let newPointId = 0

function addPoint(pathId, insertAt, code, x, y, parameters) {
  return {
    type: ActionTypes.ADD_POINT,
    pointId: ++newPointId,
    pathId,
    insertAt,
    code,
    x,
    y,
    parameters,
  }
}

export function createPoint(pathId, code, x, y, parameters) {
  return (dispatch, getState) => {
    const { pathsById, pointsById } = getState()
    const path = pathsById[pathId]

    // determine the position of the point in the corresponding path
    const insertAt = path.points.reduce(
      (acc, key, index) => pointsById[key].isActive ? index + 1 : acc,
      path.points.length
    )

    dispatch(deactivatePoints())
    dispatch(addPoint(pathId, insertAt, code, x, y, parameters))
  }
}

export function deletePoints(pointIds) {
  return (dispatch) => {
    dispatch(ensurePathsIntegrity(pointIds))
    dispatch(removePoints(pointIds))
  }
}

// could be improved ?
function ensurePathsIntegrity(pointIds) {
  return (dispatch, getState) => {
    const state = getState()
    const activePaths = activePathsSelector(state)
    const { pathsById, pointsById } = state

    activePaths.forEach((pathId) => {
      const { points } = pathsById[pathId]

      if (points.every((key) => pointIds.includes(key))) {
        dispatch(removePaths([pathId]))
      } else {
        points.forEach((key, index, keys) => {
          if (pointIds.includes(key)) {
            const point = pointsById[key]
            const pointCode = point.code.toLowerCase()

            if (index + 1 < keys.length) {
              const nextPoint = pointsById[keys[index + 1]]
              const nextPointCode = nextPoint.code.toLowerCase()

              if (
                (pointCode === "m" && index === 0)
                || (pointCode === "q" && nextPointCode === "t")
                || (pointCode === "c" && nextPointCode === "s")
              ) {
                dispatch(setPointCode(nextPoint.id, point.code))
                dispatch(setPointParameters(nextPoint.id, point.parameters))
              }
            }
          }
        })
      }
    })
  }
}

export function removePoints(pointIds) {
  return {
    type: ActionTypes.REMOVE_POINTS,
    pointIds,
  }
}

export function deactivatePoints() {
  return {
    type: ActionTypes.DEACTIVATE_POINTS,
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

export function setPointsX(pointIds, dx) {
  return {
    type: ActionTypes.SET_POINTS_X,
    pointIds,
    dx,
  }
}

export function setPointsY(pointIds, dy) {
  return {
    type: ActionTypes.SET_POINTS_Y,
    pointIds,
    dy,
  }
}

export function setPointParameters(pointId, parameters) {
  return {
    type: ActionTypes.SET_POINT_PARAMETERS,
    pointId,
    parameters,
  }
}
