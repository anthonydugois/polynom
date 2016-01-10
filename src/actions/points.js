import * as types from "../constants/ActionTypes"

export function addPoint(id, x, y) {
  return {
    type: types.ADD_POINT,
    id,
    x,
    y,
  }
}

export function removePoint(id, pointId) {
  return {
    type: types.REMOVE_POINT,
    id,
    pointId,
  }
}

export function setActivePoint(id, pointId) {
  return {
    type: types.SET_ACTIVE_POINT,
    id,
    pointId,
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

export function setQuadX1(id, pointId, x1) {
  return {
    type: types.SET_QUAD_X1,
    id,
    pointId,
    x1,
  }
}

export function setQuadY1(id, pointId, y1) {
  return {
    type: types.SET_QUAD_Y1,
    id,
    pointId,
    y1,
  }
}

export function setCubX1(id, pointId, x1) {
  return {
    type: types.SET_CUB_X1,
    id,
    pointId,
    x1,
  }
}

export function setCubY1(id, pointId, y1) {
  return {
    type: types.SET_CUB_Y1,
    id,
    pointId,
    y1,
  }
}

export function setCubX2(id, pointId, x2) {
  return {
    type: types.SET_CUB_X2,
    id,
    pointId,
    x2,
  }
}

export function setCubY2(id, pointId, y2) {
  return {
    type: types.SET_CUB_Y2,
    id,
    pointId,
    y2,
  }
}

export function setSmoothX2(id, pointId, x2) {
  return {
    type: types.SET_SMOOTH_X2,
    id,
    pointId,
    x2,
  }
}

export function setSmoothY2(id, pointId, y2) {
  return {
    type: types.SET_SMOOTH_Y2,
    id,
    pointId,
    y2,
  }
}

export function setArcRX(id, pointId, rx) {
  return {
    type: types.SET_ARC_RX,
    id,
    pointId,
    rx,
  }
}

export function setArcRY(id, pointId, ry) {
  return {
    type: types.SET_ARC_RY,
    id,
    pointId,
    ry,
  }
}

export function setArcRot(id, pointId, xAxisRotation) {
  return {
    type: types.SET_ARC_ROT,
    id,
    pointId,
    xAxisRotation,
  }
}

export function setArcLarge(id, pointId, largeArc) {
  return {
    type: types.SET_ARC_LARGE,
    id,
    pointId,
    largeArc,
  }
}

export function setArcSweep(id, pointId, sweep) {
  return {
    type: types.SET_ARC_SWEEP,
    id,
    pointId,
    sweep,
  }
}
