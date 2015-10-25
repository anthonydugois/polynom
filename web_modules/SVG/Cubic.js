import React from "react"

function Cubic(props) {
    const {
        x1,
        y1,
        x2,
        y2,
        p1x,
        p1y,
        p2x,
        p2y,
        s,
        index,
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
                    onMouseDown={ (e) => drag(e, index, "cubic", 1) }
                    cx={ x1 }
                    cy={ y1 }
                    r={ 6 } />
            ) }

            <circle
                className="ad-Anchor-point"
                onMouseDown={ (e) => drag(e, index, "cubic", 2) }
                cx={ x2 }
                cy={ y2 }
                r={ 6 } />
        </g>
    )
}

export default Cubic
