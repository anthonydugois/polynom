import Snap from "snapsvg"

function isRelative(segment) {
  return segment[0] === segment[0].toLowerCase()
}

function M(segment, point) {
  const relative = isRelative(segment)

  return [
    segment[0],
    (relative && point) ? segment[1] + point[1] : segment[1],
    (relative && point) ? segment[2] + point[2] : segment[2],
    {},
  ]
}

function L(segment, point) {
  return M(segment, point)
}

function H(segment, point) {
  const relative = isRelative(segment)

  return [
    relative ? "l" : "L",
    relative ? segment[1] + point[1] : segment[1],
    point[2],
    {},
  ]
}

function V(segment, point) {
  const relative = isRelative(segment)

  return [
    relative ? "l" : "L",
    point[1],
    relative ? segment[1] + point[2] : segment[1],
    {},
  ]
}

function Q(segment, point) {
  const relative = isRelative(segment)

  return [
    segment[0],
    relative ? segment[3] + point[1] : segment[3],
    relative ? segment[4] + point[2] : segment[4],
    {
      x1: relative ? segment[1] + point[1] : segment[1],
      y1: relative ? segment[2] + point[2] : segment[2],
    },
  ]
}

function T(segment, point) {
  return M(segment, point)
}

function C(segment, point) {
  const relative = isRelative(segment)

  return [
    segment[0],
    relative ? segment[5] + point[1] : segment[5],
    relative ? segment[6] + point[2] : segment[6],
    {
      x1: relative ? segment[1] + point[1] : segment[1],
      y1: relative ? segment[2] + point[2] : segment[2],
      x2: relative ? segment[3] + point[1] : segment[3],
      y2: relative ? segment[4] + point[2] : segment[4],
    },
  ]
}

function S(segment, point) {
  const relative = isRelative(segment)

  return [
    segment[0],
    relative ? segment[3] + point[1] : segment[3],
    relative ? segment[4] + point[2] : segment[4],
    {
      x2: relative ? segment[1] + point[1] : segment[1],
      y2: relative ? segment[2] + point[2] : segment[2],
    },
  ]
}

function A(segment, point) {
  const relative = isRelative(segment)

  return [
    segment[0],
    relative ? segment[6] + point[1] : segment[6],
    relative ? segment[7] + point[2] : segment[7],
    {
      rx: segment[1],
      ry: segment[2],
      xAxisRotation: segment[3],
      largeArc: segment[4],
      sweep: segment[5],
    },
  ]
}

function getPoints(d) {
  const points = []

  Snap.parsePathString(d).forEach((segment) => {
    const point = points.length > 0 && points[points.length - 1]

    switch (segment[0].toLowerCase()) {
    case "m":
      return points.push(M(segment, point))

    case "l":
      return points.push(L(segment, point))

    case "h":
      return points.push(H(segment, point))

    case "v":
      return points.push(V(segment, point))

    case "q":
      return points.push(Q(segment, point))

    case "t":
      return points.push(T(segment, point))

    case "c":
      return points.push(C(segment, point))

    case "s":
      return points.push(S(segment, point))

    case "a":
      return points.push(A(segment, point))
    }
  })

  return points
}

export default (d) => ({
  isClosed: !!d.match(/z/gi),
  isRelative: !!d.match(/(m|l|h|v|q|t|c|s|a)/g),
  points: getPoints(d),
})
