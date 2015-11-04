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
