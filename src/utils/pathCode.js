import { M, L, H, V, Q, T, C, S, A } from "./pointCodes"

export default (path, pointsById) => {
  const code = path.points.reduce((acc, key, index, keys) => {
    const point = pointsById[key]
    const previousPoint = index > 0 && pointsById[keys[index - 1]]

    switch (point.code.toLowerCase()) {
    case "m":
      return [...acc, ...M(point, previousPoint, path.isClosed)]

    case "l":
      if (point.y === previousPoint.y) {
        return [...acc, ...H(point, previousPoint)]
      }

      if (point.x === previousPoint.x) {
        return [...acc, ...V(point, previousPoint)]
      }

      return [...acc, ...L(point, previousPoint)]

    case "q":
      return [...acc, ...Q(point, previousPoint)]

    case "t":
      return [...acc, ...T(point, previousPoint)]

    case "c":
      return [...acc, ...C(point, previousPoint)]

    case "s":
      return [...acc, ...S(point, previousPoint)]

    case "a":
      return [...acc, ...A(point, previousPoint)]

    default:
      return []
    }
  }, [])

  if (path.isClosed) {
    code.push("z")
  }

  return code.join(" ")
}
