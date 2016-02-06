import * as ActionTypes from "../constants/ActionTypes"

export function deactivatePoints() {
  return {
    type: ActionTypes.DEACTIVATE_POINTS,
  }
}

export function setActivePoint(pointId, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_POINT,
    pointId,
    isActive,
  }
}

let newPointId = 0
export function createPoint(pathId, code, x, y, parameters) {
  return (dispatch, getState) => {
    const { pathsById, pointsById } = getState()
    const path = pathsById[pathId]

    // determine the position of the point in the corresponding path
    const insertAt = path.points.reduce((acc, key, index) => {
      return pointsById[key].isActive ? index + 1 : acc
    }, path.points.length)

    newPointId++

    dispatch(deactivatePoints())
    dispatch(addPoint(pathId, newPointId, insertAt, code, x, y, parameters))
    dispatch(setActivePoint(newPointId, true))
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

export function removePoints(pointIds) {
  return {
    type: ActionTypes.REMOVE_POINTS,
    pointIds,
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
