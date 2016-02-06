function code(path, point, str) {
  return path.isRelative || point.isRelative ?
    str.toLowerCase() : str.toUpperCase()
}

function x(path, point, previousPoint) {
  return previousPoint && (path.isRelative || point.isRelative) ?
    point.x - previousPoint.x : point.x
}

function y(path, point, previousPoint) {
  return previousPoint && (path.isRelative || point.isRelative) ?
    point.y - previousPoint.y : point.y
}

function getPointPosition(path, point, previousPoint) {
  return [
    x(path, point, previousPoint),
    y(path, point, previousPoint),
  ]
}

function getFirstAnchorPosition(path, point, previousPoint) {
  return path.isRelative || point.isRelative ? [
    point.parameters.x1 - previousPoint.x,
    point.parameters.y1 - previousPoint.y,
  ] : [
    point.parameters.x1,
    point.parameters.y1,
  ]
}

function getSecondAnchorPosition(path, point, previousPoint) {
  return path.isRelative || point.isRelative ? [
    point.parameters.x2 - previousPoint.x,
    point.parameters.y2 - previousPoint.y,
  ] : [
    point.parameters.x2,
    point.parameters.y2,
  ]
}

export function M(path, point, previousPoint = false) {
  return [
    ...(previousPoint && path.isClosed ? ["z"] : []),
    code(path, point, "m"),
    getPointPosition(path, point, previousPoint),
  ]
}

export function L(path, point, previousPoint) {
  return [
    code(path, point, "l"),
    getPointPosition(path, point, previousPoint),
  ]
}

export function H(path, point, previousPoint) {
  return [
    code(path, point, "h"),
    x(path, point, previousPoint),
  ]
}

export function V(path, point, previousPoint) {
  return [
    code(path, point, "v"),
    y(path, point, previousPoint),
  ]
}

export function Q(path, point, previousPoint) {
  return [
    code(path, point, "q"),
    getFirstAnchorPosition(path, point, previousPoint),
    getPointPosition(path, point, previousPoint),
  ]
}

export function T(path, point, previousPoint) {
  return [
    code(path, point, "t"),
    getPointPosition(path, point, previousPoint),
  ]
}

export function C(path, point, previousPoint) {
  return [
    code(path, point, "c"),
    getFirstAnchorPosition(path, point, previousPoint),
    getSecondAnchorPosition(path, point, previousPoint),
    getPointPosition(path, point, previousPoint),
  ]
}

export function S(path, point, previousPoint) {
  return [
    code(path, point, "s"),
    getSecondAnchorPosition(path, point, previousPoint),
    getPointPosition(path, point, previousPoint),
  ]
}

export function A(path, point, previousPoint) {
  return [
    code(path, point, "a"),
    point.parameters.rx,
    point.parameters.ry,
    point.parameters.xAxisRotation,
    point.parameters.largeArc ? 1 : 0,
    point.parameters.sweep ? 1 : 0,
    getPointPosition(path, point, previousPoint),
  ]
}
