function code(isRelative, code) {
  return isRelative ? code.toLowerCase() : code.toUpperCase()
}

function x(isRelative, point, previous) {
  return +(
    previous && isRelative ?
      point.x - previous.x :
      point.x
  ).toFixed(3)
}

function y(isRelative, point, previous) {
  return +(
    previous && isRelative ?
      point.y - previous.y :
      point.y
  ).toFixed(3)
}

function x1(isRelative, point, previous) {
  return +(
    isRelative ?
      point.parameters.x1 - previous.x :
      point.parameters.x1
  ).toFixed(3)
}

function y1(isRelative, point, previous) {
  return +(
    isRelative ?
      point.parameters.y1 - previous.y :
      point.parameters.y1
  ).toFixed(3)
}

function x2(isRelative, point, previous) {
  return +(
    isRelative ?
      point.parameters.x2 - previous.x :
      point.parameters.x2
    ).toFixed(3)
}

function y2(isRelative, point, previous) {
  return +(
    isRelative ?
      point.parameters.y2 - previous.y :
      point.parameters.y2
    ).toFixed(3)
}

export function M(path, point, previous = false) {
  return [
    ...previous && path.isClosed && ["z"],
    code(!path.isClosed && path.isRelative, "m"),
    x(!path.isClosed && path.isRelative, point, previous),
    y(!path.isClosed && path.isRelative, point, previous),
  ]
}

export function L(path, point, previous) {
  return [
    code(path.isRelative, "l"),
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}

export function H(path, point, previous) {
  return [
    code(path.isRelative, "h"),
    x(path.isRelative, point, previous),
  ]
}

export function V(path, point, previous) {
  return [
    code(path.isRelative, "v"),
    y(path.isRelative, point, previous),
  ]
}

export function Q(path, point, previous) {
  return [
    code(path.isRelative, "q"),
    x1(path.isRelative, point, previous),
    y1(path.isRelative, point, previous),
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}

export function T(path, point, previous) {
  return [
    code(path.isRelative, "t"),
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}

export function C(path, point, previous) {
  return [
    code(path.isRelative, "c"),
    x1(path.isRelative, point, previous),
    y1(path.isRelative, point, previous),
    x2(path.isRelative, point, previous),
    y2(path.isRelative, point, previous),
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}

export function S(path, point, previous) {
  return [
    code(path.isRelative, "s"),
    x2(path.isRelative, point, previous),
    y2(path.isRelative, point, previous),
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}

export function A(path, point, previous) {
  return [
    code(path.isRelative, "a"),
    point.parameters.rx,
    point.parameters.ry,
    point.parameters.xAxisRotation,
    point.parameters.largeArc ? 1 : 0,
    point.parameters.sweep ? 1 : 0,
    x(path.isRelative, point, previous),
    y(path.isRelative, point, previous),
  ]
}
