import { M, L, H, V, Q, T, C, S, A } from "./pointCodes"

export default (path, pointsById) => {
  const code = path.points.reduce((acc, key, index, keys) => {
    const point = pointsById[key]
    const previousPoint = index > 0 && pointsById[keys[index - 1]]

    switch (point.code.toLowerCase()) {
    case "m":
      return [...acc, ...M(path, point, previousPoint)]

    case "l":
      if (point.y === previousPoint.y) {
        return [...acc, ...H(path, point, previousPoint)]
      }

      if (point.x === previousPoint.x) {
        return [...acc, ...V(path, point, previousPoint)]
      }

      return [...acc, ...L(path, point, previousPoint)]

    case "q":
      return [...acc, ...Q(path, point, previousPoint)]

    case "t":
      return [...acc, ...T(path, point, previousPoint)]

    case "c":
      return [...acc, ...C(path, point, previousPoint)]

    case "s":
      return [...acc, ...S(path, point, previousPoint)]

    case "a":
      return [...acc, ...A(path, point, previousPoint)]

    default:
      return []
    }
  }, [])

  if (path.isClosed) {
    code.push("z")
  }

  return code.join(" ")
}
