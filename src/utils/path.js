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

export function getClosePath(path) {
    let closePath = false

    if (path.trim().match(/z$/i) !== null) {
        closePath = true
    }

    return closePath
}
