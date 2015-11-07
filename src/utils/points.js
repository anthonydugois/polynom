import parser from "svg-path-parser"

export function M(x = 0, y = 0) {
    return { type: "M", x, y }
}

export function L(x = 0, y = 0) {
    return { type: "L", x, y }
}

export function Q(qx = 0, qy = 0, x = 0, y = 0) {
    return {
        type: "Q", x, y,
        quadratic: { t: false, x: qx, y: qy },
    }
}

export function T(qx = 0, qy = 0, x = 0, y = 0) {
    const q = Q(x, y, qx, qy)

    q.quadratic.t = true

    return q
}

export function C(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x = 0, y = 0) {
    return {
        type: "C", x, y,
        cubic: { s: false, x1, y1, x2, y2 },
    }
}

export function S(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x = 0, y = 0) {
    const c = C(x, y, x1, y1, x2, y2)

    c.cubic.s = true

    return c
}

export function A(rx = 1, ry = 1, rot = 0, laf = 1, sf = 0, x = 0, y = 0) {
    return {
        type: "A", x, y,
        arc: { rx, ry, rot, laf, sf },
    }
}

export function getPathFromPoints(path) {
    return {
        relative: getRelative(path),
        closed: getClosed(path),
        points: getPoints(path),
    }
}

function getClosed(path) {
    if (path.match(/z/gi)) {
        return true
    }

    return false
}

function getRelative(path) {
    if (path.match(/(m|l|h|v|q|t|c|s|a)/g)) {
        return true
    }

    return false
}

function getPoints(path) {
    let purifiedPoints = []

    try {
        const points = parser(path)

        points.forEach((p) => {
            const type = p.code.toLowerCase()
            let point = false, values = false, x = 0, y = 0

            if (purifiedPoints.length > 0) {
                x = purifiedPoints[purifiedPoints.length - 1].x
                y = purifiedPoints[purifiedPoints.length - 1].y
            }

            switch (type) {
                case "m":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = M(...values)
                break

                case "l":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = L(...values)
                break

                case "h":
                    values = [
                        p.relative ? p.x + x : p.x,
                        y,
                    ]

                    point = L(...values)
                break

                case "v":
                    values = [
                        x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = L(...values)
                break

                case "q":
                    values = [
                        p.relative ? p.x1 + x : p.x1,
                        p.relative ? p.y1 + y : p.y1,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = Q(...values)
                break

                case "t":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = T(...values)
                break

                case "c":
                    values = [
                        p.relative ? p.x1 + x : p.x1,
                        p.relative ? p.y1 + y : p.y1,
                        p.relative ? p.x2 + x : p.x2,
                        p.relative ? p.y2 + y : p.y2,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = C(...values)
                break

                case "s":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                        p.relative ? p.x2 + x : p.x2,
                        p.relative ? p.y2 + y : p.y2,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = S(...values)
                break

                case "a":
                    values = [
                        p.rx,
                        p.ry,
                        p.xAxisRotation,
                        p.largeArc,
                        p.sweep,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = A(...values)
                break
            }

            if (point) {
                purifiedPoints.push(point)
            }
        })
    } catch (e) {
        console.log(e)
        purifiedPoints = []
    }

    return purifiedPoints
}
