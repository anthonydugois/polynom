function x(point, previousPoint) {
  return point.isRelative ? point.x - previousPoint.x : point.x
}

function y(point, previousPoint) {
  return point.isRelative ? point.y - previousPoint.y : point.y
}

function getPointPosition(point, previousPoint) {
  return `${ x(point, previousPoint) } ${ y(point, previousPoint) }`
}

function getFirstAnchorPosition(point, previousPoint) {
  if (point.isRelative) {
    return [
      point.parameters.x1 - previousPoint.x,
      point.parameters.y1 - previousPoint.y,
    ]
  }

  return [
    point.parameters.x1,
    point.parameters.y1,
  ]
}

function getSecondAnchorPosition(point, previousPoint) {
  if (point.isRelative) {
    return [
      point.parameters.x2 - previousPoint.x,
      point.parameters.y2 - previousPoint.y,
    ]
  }

  return [
    point.parameters.x2,
    point.parameters.y2,
  ]
}

export function M(point, previousPoint = false, pathIsClosed = false) {
  return [
    ...(previousPoint && pathIsClosed ? ["z"] : []),
    point.isRelative ? "m" : "M",
    getPointPosition(point, previousPoint),
  ]
}

export function L(point, previousPoint) {
  return [
    point.isRelative ? "l" : "L",
    getPointPosition(point, previousPoint),
  ]
}

export function H(point, previousPoint) {
  return [
    point.isRelative ? "h" : "H",
    x(point, previousPoint),
  ]
}

export function V(point, previousPoint) {
  return [
    point.isRelative ? "v" : "V",
    y(point, previousPoint),
  ]
}

export function Q(point, previousPoint) {
  return [
    point.isRelative ? "q" : "Q",
    getFirstAnchorPosition(point, previousPoint),
    getPointPosition(point, previousPoint),
  ]
}

export function T(point, previousPoint) {
  return [
    point.isRelative ? "t" : "T",
    getPointPosition(point, previousPoint),
  ]
}

export function C(point, previousPoint) {
  return [
    point.isRelative ? "c" : "C",
    getFirstAnchorPosition(point, previousPoint),
    getSecondAnchorPosition(point, previousPoint),
    getPointPosition(point, previousPoint),
  ]
}

export function S(point, previousPoint) {
  return [
    point.isRelative ? "s" : "S",
    getSecondAnchorPosition(point, previousPoint),
    getPointPosition(point, previousPoint),
  ]
}

export function A(point, previousPoint) {
  return [
    point.isRelative ? "a" : "A",
    point.parameters.rx,
    point.parameters.ry,
    point.parameters.xAxisRotation,
    point.parameters.largeArc ? 1 : 0,
    point.parameters.sweep ? 1 : 0,
    getPointPosition(point, previousPoint),
  ]
}
