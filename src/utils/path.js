export default function getPath(points, closed, relative) {
    let d = ""

    points.forEach((point, index, _points) => {
        if (index === 0) {
            d += `M ${ point.x } ${ point.y } `
        } else {
            const prev = _points[index - 1]

            switch (point.type) {
                case "M":
                    d += `${ relative ? "m" : "M" } `
                break

                case "L":
                    d += `${ relative ? "l" : "L" } `
                break

                case "Q":
                    if (relative) {
                        d += point.quadratic.t ?
                            "t " :
                            `q ${ point.quadratic.x - prev.x } ${ point.quadratic.y - prev.y } `
                    } else {
                        d += point.quadratic.t ?
                            "T " :
                            `Q ${ point.quadratic.x } ${ point.quadratic.y } `
                    }
                break

                case "C":
                    if (relative) {
                        d += point.cubic.s ?
                            `s ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } ` :
                            `c ${ point.cubic.x1 - prev.x } ${ point.cubic.y1 - prev.y } ${ point.cubic.x2 - prev.x } ${ point.cubic.y2 - prev.y } `
                    } else {
                        d += point.cubic.s ?
                            `S ${ point.cubic.x2 } ${ point.cubic.y2 } ` :
                            `C ${ point.cubic.x1 } ${ point.cubic.y1 } ${ point.cubic.x2 } ${ point.cubic.y2 } `
                    }
                break

                case "A":
                    d += `${ relative ? "a" : "A" } ${ point.arc.rx } ${ point.arc.ry } ${ point.arc.rot } ${ point.arc.laf } ${ point.arc.sf } `
                break
            }

            if (relative) {
                d += `${ point.x - prev.x } ${ point.y - prev.y } `
            } else {
                d += `${ point.x } ${ point.y } `
            }
        }
    })

    if (closed) {
        d += "z"
    }

    return d
}
