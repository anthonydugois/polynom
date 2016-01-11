import * as types from "../constants/ActionTypes"
import { getPathById } from "./paths"

export function getPointById(points, id) {
  const index = points.map((point) => point.id).indexOf(id)

  return {
    index,
    point: points[index],
  }
}

export function addPoint(id, x, y) {
  return {
    type: types.ADD_POINT,
    id,
    x,
    y,
  }
}

export function removePoint(id, pointId) {
  return (dispatch, getState) => {
    const { path } = getPathById(getState().paths, id)
    const { index, point } = getPointById(path.points, pointId)

    if (path.points.length > 1) {
      if (point.isActive) {
        const activeId = index === 0 ?
          path.points[index + 1].id : path.points[index - 1].id

        dispatch(setActivePoint(id, activeId))
      }

      dispatch({
        type: types.REMOVE_POINT,
        id,
        pointId,
      })
    }
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
