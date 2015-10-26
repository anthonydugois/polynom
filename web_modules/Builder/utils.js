/**
 * Point objects
 */
export function M(x, y) {
    return { x, y }
}

export function L(x, y) {
    return M(x, y)
}

export function Q(x, y, qx, qy) {
    return {
        ...L(x, y),
        quadratic: { t: false, x: qx, y: qy },
    }
}

export function T(x, y, qx, qy) {
    const q = Q(x, y, qx, qy)

    q.quadratic.t = true

    return q
}

export function C(x, y, x1, y1, x2, y2) {
    return {
        ...L(x, y),
        cubic: { s: false, x1, y1, x2, y2 },
    }
}

export function S(x, y, x1, y1, x2, y2) {
    const c = C(x, y, x1, y1, x2, y2)

    c.cubic.s = true

    return c
}

export function A(x, y, rx, ry, rot, laf, sf) {
    return {
        ...L(x, y),
        arc: { rx, ry, rot, laf, sf },
    }
}

export function getPath(points, closePath) {
    let d = ""

    points.forEach((point, index) => {
        if (index === 0) {
            // first point
            d += "M "
        } else if (point.quadratic) {
            // quadratic
            d += point.quadratic.t ?
                "T " :
                `Q ${ point.quadratic.x } ${ point.quadratic.y } `
        } else if (point.cubic) {
            // cubic
            d += point.cubic.s ?
                `S ${ point.cubic.x2 } ${ point.cubic.y2 } ` :
                `C ${ point.cubic.x1 } ${ point.cubic.y1 } ${ point.cubic.x2 } ${ point.cubic.y2 } `
        } else if (point.arc) {
            // arc
            d += `A ${ point.arc.rx } ${ point.arc.ry } ${ point.arc.rot } ${ point.arc.laf } ${ point.arc.sf } `
        } else {
            // line
            d += "L "
        }

        // point position
        d += `${ point.x } ${ point.y } `
    })

    if (closePath) {
        d += "Z"
    }

    return d
}

export function getPoints(path) {
    let re = /(m|l|h|v|q|t|c|s|a) ?([0-9, ]+)/gi,
        points = [],
        purifiedPoints = [],
        match

    while ((match = re.exec(path.trim())) !== null) {
        points.push({
            type: match[1],
            values: match[2].trim().split(/\s*,\s*|\s+/),
        })
    }

    points.forEach(({ type, values }) => {
        let point = false

        switch (type.toLowerCase()) {
            case "m": point = M(...values)
            break
            case "l": point = L(...values)
            break
            case "q": point = Q(...values)
            break
            case "t": point = T(...values)
            break
            case "c": point = C(...values)
            break
            case "s": point = S(...values)
            break
            case "a": point = A(...values)
            break
        }

        if (point) {
            purifiedPoints.push(point)
        }
    })

    return purifiedPoints
}

export function getClosePath(path) {
    let closePath = false

    if (path.trim().match(/z$/i) !== null) {
        closePath = true
    }

    return closePath
}

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
