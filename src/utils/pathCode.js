import { M, L, H, V, Q, T, C, S, A } from "./pointCodes"

export default (path, pointsById) => {
  const code = path.points.reduce((acc, key, index, keys) => {
    const point = pointsById[key]
    const previous = index > 0 && pointsById[keys[index - 1]]

    switch (point.code.toLowerCase()) {
    case "m":
      return [...acc, ...M(path, point, previous)]

    case "l":
      if (point.y === previous.y) {
        return [...acc, ...H(path, point, previous)]
      }

      if (point.x === previous.x) {
        return [...acc, ...V(path, point, previous)]
      }

      return [...acc, ...L(path, point, previous)]

    case "q":
      return [...acc, ...Q(path, point, previous)]

    case "t":
      return [...acc, ...T(path, point, previous)]

    case "c":
      return [...acc, ...C(path, point, previous)]

    case "s":
      return [...acc, ...S(path, point, previous)]

    case "a":
      return [...acc, ...A(path, point, previous)]

    default:
      return []
    }
  }, [])

  if (path.isClosed) {
    code.push("z")
  }

  return code.join(" ")
}
