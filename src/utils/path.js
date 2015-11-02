export function getPath(points, closePath, relativePoints) {
    let d = ""

    points.forEach((point, index, _points) => {
        if (index === 0) {
            d += `M ${ point.x } ${ point.y } `
        } else {
            const prev = _points[index - 1]

            if (point.quadratic) {
                if (relativePoints) {
                    d += point.quadratic.t ?
                        "t " :
                        `q ${ point.quadratic.x - prev.x } ${ point.quadratic.y - prev.y } `
                } else {
                    d += point.quadratic.t ?
                        "T " :
                        `Q ${ point.quadratic.x } ${ point.quadratic.y } `
                }
            } else if (point.cubic) {
                if (relativePoints) {
                    d += point.cubic.s ?
                        `s ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } ` :
                        `c ${ point.cubic.x1 - prev.x } ${ point.cubic.y1 - prev.y } ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } `
                } else {
                    d += point.cubic.s ?
                        `S ${ point.cubic.x2 } ${ point.cubic.y2 } ` :
                        `C ${ point.cubic.x1 } ${ point.cubic.y1 } ${ point.cubic.x2 } ${ point.cubic.y2 } `
                }
            } else if (point.arc) {
                if (relativePoints) {
                    d += "a "
                } else {
                    d += "A "
                }

                d += `${ point.arc.rx } ${ point.arc.ry } ${ point.arc.rot } ${ point.arc.laf } ${ point.arc.sf } `
            } else {
                if (relativePoints) {
                    d += "l "
                } else {
                    d += "L "
                }
            }

            if (relativePoints) {
                d += `${ point.x - prev.x } ${ point.y - prev.y } `
            } else {
                d += `${ point.x } ${ point.y } `
            }
        }
    })

    if (closePath) {
        d += "z"
    }

    return d
}

export function getClosePath(path) {
    let closePath = false

    if (path.trim().match(/z$/i) !== null) {
        closePath = true
    }

    return closePath
}
