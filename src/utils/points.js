import parser from "svg-path-parser"
import { parseIntArray } from "./maths"

export function M(x = 0, y = 0) {
    return { type: "m", x, y }
}

export function L(x = 0, y = 0) {
    return { type: "l", x, y }
}

export function Q(qx = 0, qy = 0, x = 0, y = 0) {
    return {
        type: "q", x, y,
        quadratic: { t: false, x: qx, y: qy },
    }
}

export function T(qx = 0, qy = 0, x = 0, y = 0) {
    const q = Q(qx, qy, x, y)

    q.quadratic.t = true

    return q
}

export function C(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x = 0, y = 0) {
    return {
        type: "c", x, y,
        cubic: { s: false, x1, y1, x2, y2 },
    }
}

export function S(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x = 0, y = 0) {
    const c = C(x1, y1, x2, y2, x, y)

    c.cubic.s = true

    return c
}

export function A(rx = 1, ry = 1, rot = 0, laf = 1, sf = 0, x = 0, y = 0) {
    return {
        type: "a", x, y,
        arc: { rx, ry, rot, laf, sf },
    }
}

export function getPathFromString(path) {
    return {
        closed: getClosed(path),
        relative: getRelative(path),
        filled: false,
        activePoint: 0,
        points: getPoints(path),
    }
}

function getClosed(path) {
    return !! path.match(/z/gi)
}

function getRelative(path) {
    return !! path.match(/(m|l|h|v|q|t|c|s|a)/g)
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

                    point = M(...parseIntArray(values))
                break

                case "l":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = L(...parseIntArray(values))
                break

                case "h":
                    values = [
                        p.relative ? p.x + x : p.x,
                        y,
                    ]

                    point = L(...parseIntArray(values))
                break

                case "v":
                    values = [
                        x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = L(...parseIntArray(values))
                break

                case "q":
                    values = [
                        p.relative ? p.x1 + x : p.x1,
                        p.relative ? p.y1 + y : p.y1,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = Q(...parseIntArray(values))
                break

                case "t":
                    values = [
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                        p.relative ? p.x + x : p.x,
                        p.relative ? p.y + y : p.y,
                    ]

                    point = T(...parseIntArray(values))
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

                    point = C(...parseIntArray(values))
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

                    point = S(...parseIntArray(values))
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

                    point = A(...parseIntArray(values))
                break
            }

            if (point) {
                purifiedPoints.push(point)
            }
        })
    } catch (e) {
        if (__DEV__) {
            console.log(e)
        }
    }

    return purifiedPoints
}
