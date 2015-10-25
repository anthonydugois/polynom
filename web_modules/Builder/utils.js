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

    points.forEach(({ type, values }, index, _points) => {
        let point = false,
            previous = false,
            _type = type.toLowerCase()

        if (index !== 0) {
            previous = _points[index - 1]
        }

        if (["m", "l"].indexOf(_type) > -1 && values.length === 2) {
            point = {
                x: values[0],
                y: values[1],
            }
        } else if (_type === "q" && values.length === 4) {
            point = {
                x: values[2],
                y: values[3],
                quadratic: {
                    t: false,
                    x: values[0],
                    y: values[1],
                },
            }
        } else if (_type === "t" && values.length === 2) {
            point = {
                x: values[0],
                y: values[1],
                quadratic: {
                    t: true,
                    x: (values[0] + previous.values[0]) / 2,
                    y: (values[1] + previous.values[1]) / 2,
                },
            }
        } else if (_type === "c" && values.length === 6) {
            point = {
                x: values[4],
                y: values[5],
                cubic: {
                    s: false,
                    x1: values[0],
                    y1: values[1],
                    x2: values[2],
                    y2: values[3],
                },
            }
        } else if (_type === "s" && values.length === 4) {
            point = {
                x: values[2],
                y: values[3],
                cubic: {
                    s: true,
                    x1: (values[2] + previous.values[2] - 50) / 2,
                    y1: (values[3] + previous.values[3]) / 2,
                    x2: values[0],
                    y2: values[1],
                },
            }
        } else if (_type === "a" && values.length === 7) {
            point = {
                x: values[5],
                y: values[6],
                arc: {
                    rx: values[0],
                    ry: values[1],
                    rot: values[2],
                    laf: values[3],
                    sf: values[4],
                },
            }
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
