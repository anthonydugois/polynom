import * as types from "../constants/ActionTypes"

export function setPointCode(id, pointId, code) {
  return {
    type: types.SET_POINT_CODE,
    id,
    pointId,
    code,
  }
}

export function setPointX(id, pointId, x) {
  return {
    type: types.SET_POINT_X,
    id,
    pointId,
    x,
  }
}

export function setPointY(id, pointId, y) {
  return {
    type: types.SET_POINT_Y,
    id,
    pointId,
    y,
  }
}
