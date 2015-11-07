export default function getPath(points, closed, relative) {
    let d = ""

    points.forEach((point, index, _points) => {
        if (index === 0) {
            d += `M ${ point.x } ${ point.y } `
        } else {
            const prev = _points[index - 1]

            switch (point.type) {
                case "M":
                    d += M(prev, point, relative)
                break

                case "L":
                    d += L(prev, point, relative)
                break

                case "Q":
                    d += Q(prev, point, relative)
                break

                case "C":
                    d += C(prev, point, relative)
                break

                case "A":
                    d += A(prev, point, relative)
                break
            }
        }
    })

    if (closed) {
        d += "z"
    }

    return d
}

function position(prev, point, relative) {
    let d

    if (relative) {
        d = `${ point.x - prev.x } ${ point.y - prev.y } `
    } else {
        d = `${ point.x } ${ point.y } `
    }

    return d
}

function M(prev, point, relative) {
    return `${ relative ? "m" : "M" } ${ position(prev, point, relative) }`
}

function L(prev, point, relative) {
    let d

    if (point.x === prev.x && point.y !== prev.y) {
        d = `${ relative ? "v" : "V" } ${ relative ? point.y - prev.y : point.y } `
    } else if (point.y === prev.y && point.x !== prev.x) {
        d = `${ relative ? "h" : "H" } ${ relative ? point.x - prev.x : point.x } `
    } else {
        d = `${ relative ? "l" : "L" } ${ position(prev, point, relative) }`
    }

    return d
}

function Q(prev, point, relative) {
    let d

    if (relative) {
        d = point.quadratic.t ?
            "t " :
            `q ${ point.quadratic.x - prev.x } ${ point.quadratic.y - prev.y } `
    } else {
        d = point.quadratic.t ?
            "T " :
            `Q ${ point.quadratic.x } ${ point.quadratic.y } `
    }

    d += position(prev, point, relative)

    return d
}

function C(prev, point, relative) {
    let d

    if (relative) {
        d = point.cubic.s ?
            `s ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } ` :
            `c ${ point.cubic.x1 - prev.x } ${ point.cubic.y1 - prev.y } ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } `
    } else {
        d = point.cubic.s ?
            `S ${ point.cubic.x2 } ${ point.cubic.y2 } ` :
            `C ${ point.cubic.x1 } ${ point.cubic.y1 } ${ point.cubic.x2 } ${ point.cubic.y2 } `
    }

    d += position(prev, point, relative)

    return d
}

function A(prev, point, relative) {
    return `${ relative ? "a" : "A" } ${ point.arc.rx } ${ point.arc.ry } ${ point.arc.rot } ${ point.arc.laf } ${ point.arc.sf } ${ position(prev, point, relative) }`
}
