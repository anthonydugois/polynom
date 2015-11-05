import React from "react"

function Quadratic(props) {
    const {
        activePath,
        activePoint,
        x,
        y,
        p1x,
        p1y,
        p2x,
        p2y,
        t,
        drag,
    } = props

    let anchor = (<g />)

    if (! t) {
        anchor = (
            <g className="ad-Anchor">
                <line
                    className="ad-Anchor-line"
                    x1={ p1x }
                    y1={ p1y }
                    x2={ x }
                    y2={ y } />

                <line
                    className="ad-Anchor-line"
                    x1={ x }
                    y1={ y }
                    x2={ p2x }
                    y2={ p2y } />

                <circle
                    className="ad-Anchor-point"
                    cx={ x }
                    cy={ y }
                    r={ 6 }
                    onMouseDown={ (e) => drag(e, activePath, activePoint, "quadratic") } />
            </g>
        )
    }

    return anchor
}

export default Quadratic
