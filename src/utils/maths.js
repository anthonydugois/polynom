export function positive(n, min = false, max = false) {
  n = parseInt(n)

  if (isNaN(n) || n < 0) {
    n = 0
  }

  if (min && n < min) {
    n = min
  }

  if (max && n > max) {
    n = max
  }

  return n
}

export function parseIntArray(values) {
  return values.map((n) => {
    if (isNaN(parseInt(n))) {
      n = n ? 1 : 0
    } else {
      n = parseInt(n)
    }

    return n
  })
}
