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
        index,
        setDraggedCubic,
    } = props

    return (
        <g className="ad-Anchor">
            <line
                className="ad-Anchor-line"
                x1={ p1x }
                y1={ p1y }
                x2={ x1 }
                y2={ y1 } />

            <line
                className="ad-Anchor-line"
                x1={ p2x }
                y1={ p2y }
                x2={ x2 }
                y2={ y2 } />

            <circle
                className="ad-Anchor-point"
                onMouseDown={ (e) => setDraggedCubic(e, index, 0) }
                cx={ x1 }
                cy={ y1 }
                r={ 6 } />

            <circle
                className="ad-Anchor-point"
                onMouseDown={ (e) => setDraggedCubic(e, index, 1) }
                cx={ x2 }
                cy={ y2 }
                r={ 6 } />
        </g>
    )
}

export default Cubic
