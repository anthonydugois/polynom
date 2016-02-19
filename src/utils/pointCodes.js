function code(path, point, str) {
  return path.isRelative ? str.toLowerCase() : str.toUpperCase()
}

function x(path, point, previous) {
  return +(previous && path.isRelative ?
    point.x - previous.x : point.x).toFixed(3)
}

function y(path, point, previous) {
  return +(previous && path.isRelative ?
    point.y - previous.y : point.y).toFixed(3)
}

function x1(path, point, previous) {
  return +(path.isRelative ?
    point.parameters.x1 - previous.x : point.parameters.x1).toFixed(3)
}

function y1(path, point, previous) {
  return +(path.isRelative ?
    point.parameters.y1 - previous.y : point.parameters.y1).toFixed(3)
}

function x2(path, point, previous) {
  return +(path.isRelative ?
    point.parameters.x2 - previous.x : point.parameters.x2).toFixed(3)
}

function y2(path, point, previous) {
  return +(path.isRelative ?
    point.parameters.y2 - previous.y : point.parameters.y2).toFixed(3)
}

export function M(path, point, previous = false) {
  return [
    ...previous && path.isClosed && ["z"],
    code(path, point, "m"),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function L(path, point, previous) {
  return [
    code(path, point, "l"),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function H(path, point, previous) {
  return [
    code(path, point, "h"),
    x(path, point, previous),
  ]
}

export function V(path, point, previous) {
  return [
    code(path, point, "v"),
    y(path, point, previous),
  ]
}

export function Q(path, point, previous) {
  return [
    code(path, point, "q"),
    x1(path, point, previous),
    y1(path, point, previous),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function T(path, point, previous) {
  return [
    code(path, point, "t"),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function C(path, point, previous) {
  return [
    code(path, point, "c"),
    x1(path, point, previous),
    y1(path, point, previous),
    x2(path, point, previous),
    y2(path, point, previous),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function S(path, point, previous) {
  return [
    code(path, point, "s"),
    x2(path, point, previous),
    y2(path, point, previous),
    x(path, point, previous),
    y(path, point, previous),
  ]
}

export function A(path, point, previous) {
  return [
    code(path, point, "a"),
    point.parameters.rx,
    point.parameters.ry,
    point.parameters.xAxisRotation,
    point.parameters.largeArc ? 1 : 0,
    point.parameters.sweep ? 1 : 0,
    x(path, point, previous),
    y(path, point, previous),
  ]
}
