import React from "react"

function Cubic(props) {
    const {
        activePath,
        activePoint,
        x1,
        y1,
        x2,
        y2,
        p1x,
        p1y,
        p2x,
        p2y,
        s,
        drag,
    } = props

    return (
        <g className="ad-Anchor">
            { ! s && (
                <line
                    className="ad-Anchor-line"
                    x1={ p1x }
                    y1={ p1y }
                    x2={ x1 }
                    y2={ y1 } />
            ) }

            <line
                className="ad-Anchor-line"
                x1={ p2x }
                y1={ p2y }
                x2={ x2 }
                y2={ y2 } />

            { ! s && (
                <circle
                    className="ad-Anchor-point"
                    cx={ x1 }
                    cy={ y1 }
                    r={ 6 }
                    onMouseDown={ (e) => drag(e, activePath, activePoint, "cubic", 1) } />
            ) }

            <circle
                className="ad-Anchor-point"
                cx={ x2 }
                cy={ y2 }
                r={ 6 }
                onMouseDown={ (e) => drag(e, activePath, activePoint, "cubic", 2) } />
        </g>
    )
}

export default Cubic
