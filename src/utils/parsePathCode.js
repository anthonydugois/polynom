import Snap from "snapsvg"

function getPoint(segment) {
  const code = segment[0]
  const x = segment[segment.length - 2]
  const y = segment[segment.length - 1]
  const point = [code, x, y]

  switch (code.toLowerCase()) {
  case "m":
  case "l":
  case "t":
    return [...point, {}]

  case "q":
    return [
      ...point,
      {
        x1: segment[1],
        y1: segment[2],
      },
    ]

  case "c":
    return [
      ...point,
      {
        x1: segment[1],
        y1: segment[2],
        x2: segment[3],
        y2: segment[4],
      },
    ]

  case "s":
    return [
      ...point,
      {
        x2: segment[1],
        y2: segment[2],
      },
    ]

  case "a":
    return [
      ...point,
      {
        rx: segment[1],
        ry: segment[2],
        xAxisRotation: segment[3],
        largeArc: segment[4],
        sweep: segment[5],
      },
    ]
  }
}

export default (d) => Snap.parsePathString(d).map(getPoint)
