import * as ActionTypes from "../constants/ActionTypes"
import { activePathsSelector } from "../selectors"
import { removePaths } from "./paths"

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

let newPointId = 0
export function createPoint(pathId, code, x, y, parameters) {
  return (dispatch, getState) => {
    const { pathsById, pointsById } = getState()
    const path = pathsById[pathId]

    // determine the position of the point in the corresponding path
    const insertAt = path.points.reduce(
      (acc, key, index) => pointsById[key].isActive ? index + 1 : acc,
      path.points.length
    )

    newPointId++

    dispatch(deactivatePoints())
    dispatch(addPoint(pathId, newPointId, insertAt, code, x, y, parameters))
    dispatch(setActivePoints([newPointId], true))
  }
}

function addPoint(pathId, pointId, insertAt, code, x, y, parameters) {
  return {
    type: ActionTypes.ADD_POINT,
    pathId,
    pointId,
    insertAt,
    code,
    x,
    y,
    parameters,
  }
}

export function deletePoints(pointIds) {
  return (dispatch) => {
    dispatch(ensurePathsIntegrity(pointIds))
    dispatch(removePoints(pointIds))
  }
}

function removePoints(pointIds) {
  return {
    type: ActionTypes.REMOVE_POINTS,
    pointIds,
  }
}

// could be improved ?
function ensurePathsIntegrity(pointIds) {
  return (dispatch, getState) => {
    const state = getState()
    const activePaths = activePathsSelector(state)
    const { pathsById, pointsById } = state

    activePaths.forEach((pathId) => {
      pathsById[pathId].points.forEach((pointId, index, points) => {
        if (pointIds.includes(pointId)) {
          const point = pointsById[pointId]
          const pointCode = point.code.toLowerCase()
          const nextPoint = pointsById[points[index + 1]]
          const nextPointCode = nextPoint.code.toLowerCase()

          if (pointCode === "m" && index === 0 && points.length <= 1) {
            dispatch(removePaths([pathId]))
          }

          if (
            (pointCode === "m" && index === 0 && points.length > 1)
            || (pointCode === "q" && nextPointCode === "t")
            || (pointCode === "c" && nextPointCode === "s")
          ) {
            dispatch(setPointCode(
              nextPoint.id,
              point.code,
              point.parameters
            ))
          }
        }
      })
    })
  }
}

export function setPointCode(pointId, code, parameters) {
  return {
    type: ActionTypes.SET_POINT_CODE,
    pointId,
    code,
    parameters,
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
