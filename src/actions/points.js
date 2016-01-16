import * as ActionTypes from "../constants/ActionTypes"
import { setActivePath } from "./paths"

export function createPoint(pathId, code, x, y, parameters) {
  return (dispatch, getState) => {
    const { paths, points } = getState()
    const { pathsById } = paths
    const pointId = Math.max(...Object.keys(points)) + 1

    // determine the position of the point in the corresponding path
    const insertAt = pathsById[pathId].points.reduce((acc, key, index) => {
      if (points[key].isActive) {
        return index + 1
      }

      return acc
    }, 0)

    // add a point to state
    dispatch(addPoint(pathId, pointId, insertAt, code, x, y, parameters))
    // activate the new point
    dispatch(activatePoint(pathId, pointId))
  }
}

export function activatePoint(pathId, pointId) {
  return (dispatch, getState) => {
    const { pathsById } = getState().paths

    // when a user active a point, the system has to keep
    // the corresponding path active
    dispatch(setActivePath(pathId))

    // then deactivate all point of the path and active the good one
    dispatch(deactivatePoints(pathsById[pathId].points))
    dispatch(setActivePoint(pointId, true))
  }
}

function addPoint(pathId, pointId, insertAt, code, x, y, parameters) {
  return {
    type: ActionTypes.ADD_POINT,
    pathId,
    pointId,
    insertAt,
    code,
    x, y,
    parameters,
  }
}

export function removePoint(pathId, pointId) {
  return {
    type: ActionTypes.REMOVE_POINT,
    pathId,
    pointId,
  }
}

function deactivatePoints(pointIds) {
  return {
    type: ActionTypes.DEACTIVATE_POINTS,
    pointIds,
  }
}

function setActivePoint(pointId, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_POINT,
    pointId,
    isActive,
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

export function setPointParameters(pointId, parameters) {
  return {
    type: ActionTypes.SET_POINT_PARAMETERS,
    pointId,
    parameters,
  }
}
