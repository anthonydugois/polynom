import React from "react"

function Point(props) {
    const {
        x,
        y,
        setDraggedPoint,
        index,
    } = props

    return (
        <circle
            className="ad-Point"
            onMouseDown={ (e) => setDraggedPoint(index) }
            cx={ x }
            cy={ y }
            r={ 8 } />
    )
}

export default Point
