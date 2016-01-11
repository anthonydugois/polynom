import * as ActionTypes from "../constants/ActionTypes"

export function addPoint(id, x, y) {
  return {
    type: ActionTypes.ADD_POINT,
    id,
    x,
    y,
  }
}

export function removePoint(id) {
  return (dispatch, getState) => {
    const { path } = getPathById(getState().paths, id)
    // const { index, point } = getPointById(path.points)

    if (path.points.length > 1) {
      /* if (point.isActive) {
        const activeId = index === 0 ?
          path.points[index + 1].id : path.points[index - 1].id

        dispatch(setActivePoint(id, activeId))
      } */

      dispatch({
        type: ActionTypes.REMOVE_POINT,
        id,
        pointId,
      })
    }
  }
}

export function setActivePoint(id) {
  return {
    type: ActionTypes.SET_ACTIVE_POINT,
    id,
  }
}

export function setPointCode(id, code, parameters) {
  return {
    type: ActionTypes.SET_POINT_CODE,
    id,
    code,
    parameters,
  }
}

export function setPointX(id, x) {
  return {
    type: ActionTypes.SET_POINT_X,
    id,
    x,
  }
}

export function setPointY(id, y) {
  return {
    type: ActionTypes.SET_POINT_Y,
    id,
    y,
  }
}

export function setQuadX1(id, x1) {
  return {
    type: ActionTypes.SET_QUAD_X1,
    id,
    x1,
  }
}

export function setQuadY1(id, y1) {
  return {
    type: ActionTypes.SET_QUAD_Y1,
    id,
    y1,
  }
}

export function setCubX1(id, x1) {
  return {
    type: ActionTypes.SET_CUB_X1,
    id,
    x1,
  }
}

export function setCubY1(id, y1) {
  return {
    type: ActionTypes.SET_CUB_Y1,
    id,
    y1,
  }
}

export function setCubX2(id, x2) {
  return {
    type: ActionTypes.SET_CUB_X2,
    id,
    x2,
  }
}

export function setCubY2(id, y2) {
  return {
    type: ActionTypes.SET_CUB_Y2,
    id,
    y2,
  }
}

export function setSmoothX2(id, x2) {
  return {
    type: ActionTypes.SET_SMOOTH_X2,
    id,
    x2,
  }
}

export function setSmoothY2(id, y2) {
  return {
    type: ActionTypes.SET_SMOOTH_Y2,
    id,
    y2,
  }
}

export function setArcRX(id, rx) {
  return {
    type: ActionTypes.SET_ARC_RX,
    id,
    rx,
  }
}

export function setArcRY(id, ry) {
  return {
    type: ActionTypes.SET_ARC_RY,
    id,
    ry,
  }
}

export function setArcRot(id, xAxisRotation) {
  return {
    type: ActionTypes.SET_ARC_ROT,
    id,
    xAxisRotation,
  }
}

export function setArcLarge(id, largeArc) {
  return {
    type: ActionTypes.SET_ARC_LARGE,
    id,
    largeArc,
  }
}

export function setArcSweep(id, sweep) {
  return {
    type: ActionTypes.SET_ARC_SWEEP,
    id,
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
