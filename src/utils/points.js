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

export function getPoints(path) {
    let re = /(m|l|h|v|q|t|c|s|a) ?([0-9, ]+)/gi,
        points = [],
        _points = [],
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
            _points.push(point)
        }
    })

    return _points
}
