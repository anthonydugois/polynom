import * as types from "../constants/ActionTypes"

export function Q(x1, y1) {
  return {
    x1,
    y1,
  }
}

export function C(x1, y1, x2, y2) {
  return {
    x1,
    y1,
    x2,
    y2,
  }
}

export function S(x2, y2) {
  return {
    x2,
    y2,
  }
}

export function A(rx, ry, xAxisRotation, largeArc, sweep) {
  return {
    rx,
    ry,
    xAxisRotation,
    largeArc,
    sweep,
  }
}

export function setPointCode(id, pointId, code, parameters) {
  return {
    type: types.SET_POINT_CODE,
    id,
    pointId,
    code,
    parameters,
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
