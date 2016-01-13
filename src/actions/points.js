import * as ActionTypes from "../constants/ActionTypes"

export function addPoint(pathId, code, x, y, isActive, isRelative, parameters) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.ADD_POINT,
      code,
      x,
      y,
      isActive,
      isRelative,
      parameters,
    })

    // then insert it in the path and make it active
    const { paths, points } = getState()
    const activePointId = paths[pathId].points.filter((i) => {
      return points[i].isActive
    })[0]
    const pointId = Math.max(...Object.keys(points))

    dispatch(insertPoint(pathId, activePointId, pointId))
    dispatch(setActivePoint(pointId))
  }
}

export function removePoint(pathId, pointId) {
  return {
    type: ActionTypes.REMOVE_POINT,
    pathId,
    pointId,
  }
}

function insertPoint(pathId, activePointId, pointId) {
  return {
    type: ActionTypes.INSERT_POINT,
    pathId,
    activePointId,
    pointId,
  }
}

export function setActivePoint(pointId) {
  return {
    type: ActionTypes.SET_ACTIVE_POINT,
    pointId,
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

export function setQuadX1(pointId, x1) {
  return {
    type: ActionTypes.SET_QUAD_X1,
    pointId,
    x1,
  }
}

export function setQuadY1(pointId, y1) {
  return {
    type: ActionTypes.SET_QUAD_Y1,
    pointId,
    y1,
  }
}

export function setCubX1(pointId, x1) {
  return {
    type: ActionTypes.SET_CUB_X1,
    pointId,
    x1,
  }
}

export function setCubY1(pointId, y1) {
  return {
    type: ActionTypes.SET_CUB_Y1,
    pointId,
    y1,
  }
}

export function setCubX2(pointId, x2) {
  return {
    type: ActionTypes.SET_CUB_X2,
    pointId,
    x2,
  }
}

export function setCubY2(pointId, y2) {
  return {
    type: ActionTypes.SET_CUB_Y2,
    pointId,
    y2,
  }
}

export function setSmoothX2(pointId, x2) {
  return {
    type: ActionTypes.SET_SMOOTH_X2,
    pointId,
    x2,
  }
}

export function setSmoothY2(pointId, y2) {
  return {
    type: ActionTypes.SET_SMOOTH_Y2,
    pointId,
    y2,
  }
}

export function setArcRX(pointId, rx) {
  return {
    type: ActionTypes.SET_ARC_RX,
    pointId,
    rx,
  }
}

export function setArcRY(pointId, ry) {
  return {
    type: ActionTypes.SET_ARC_RY,
    pointId,
    ry,
  }
}

export function setArcRot(pointId, xAxisRotation) {
  return {
    type: ActionTypes.SET_ARC_ROT,
    pointId,
    xAxisRotation,
  }
}

export function setArcLarge(pointId, largeArc) {
  return {
    type: ActionTypes.SET_ARC_LARGE,
    pointId,
    largeArc,
  }
}

export function setArcSweep(pointId, sweep) {
  return {
    type: ActionTypes.SET_ARC_SWEEP,
    pointId,
    sweep,
  }
}

function getPointPosition(point, previousPoint) {
  if (point.isRelative) {
    return `
      ${ point.x - previousPoint.x }
      ${ point.y - previousPoint.y }
    `
  }

  return `
    ${ point.x }
    ${ point.y }
  `
}

function getFirstAnchorPosition(point, previousPoint) {
  if (point.isRelative) {
    return `
      ${ point.parameters.x1 - previousPoint.x }
      ${ point.parameters.y1 - previousPoint.y }
    `
  }

  return `
    ${ point.parameters.x1 }
    ${ point.parameters.y1 }
  `
}

function getSecondAnchorPosition(point, previousPoint) {
  if (point.isRelative) {
    return `
      ${ point.parameters.x2 - previousPoint.x }
      ${ point.parameters.y2 - previousPoint.y }
    `
  }

  return `
    ${ point.parameters.x2 }
    ${ point.parameters.y2 }
  `
}

export function M(point, previousPoint = false, pathIsClosed = false) {
  return `
    ${ previousPoint && pathIsClosed && "z" }
    ${ point.isRelative ? "m" : "M" }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function L(point, previousPoint) {
  return `
    ${ point.isRelative ? "l" : "L" }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function Q(point, previousPoint) {
  return `
    ${ point.isRelative ? "q" : "Q" }
    ${ getFirstAnchorPosition(point, previousPoint) }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function T(point, previousPoint) {
  return `
    ${ point.isRelative ? "t" : "T" }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function C(point, previousPoint) {
  return `
    ${ point.isRelative ? "c" : "C" }
    ${ getFirstAnchorPosition(point, previousPoint) }
    ${ getSecondAnchorPosition(point, previousPoint) }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function S(point, previousPoint) {
  return `
    ${ point.isRelative ? "s" : "S" }
    ${ getSecondAnchorPosition(point, previousPoint) }
    ${ getPointPosition(point, previousPoint) }
  `
}

export function A(point, previousPoint) {
  return `
    ${ point.isRelative ? "a" : "A" }
    ${ point.parameters.rx }
    ${ point.parameters.ry }
    ${ point.parameters.xAxisRotation }
    ${ point.parameters.largeArc ? 1 : 0 }
    ${ point.parameters.sweep ? 1 : 0 }
    ${ getPointPosition(point, previousPoint) }
  `
}
