export default (code, point, previousPoint) => {
  const middleX = previousPoint.x + (point.x - previousPoint.x) / 2
  const middleY = previousPoint.y + (point.y - previousPoint.y) / 2

  switch (code.toLowerCase()) {
  case "q":
    return {
      x1: middleX,
      y1: middleY,
    }

  case "c":
    return {
      x1: middleX,
      y1: middleY,
      x2: middleX,
      y2: middleY,
    }

  case "s":
    return {
      x2: middleX,
      y2: middleY,
    }

  case "a":
    return {
      rx: 50,
      ry: 50,
      xAxisRotation: 0,
      largeArc: false,
      sweep: false,
    }

  default:
    return {}
  }
}
