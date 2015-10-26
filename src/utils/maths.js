export function positive(n) {
    n = parseInt(n)

    if (isNaN(n) || n < 0) {
        n = 0
    }

    return n
}

export function rangeGrid(n, min, max) {
    if (n < min) {
        n = min
    }

    if (n >= max) {
        n = max / 2
    }

    return n
}
