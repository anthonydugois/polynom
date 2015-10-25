import React from "react"

function Point(props) {
    const {
        x,
        y,
        drag,
        index,
    } = props

    return (
        <circle
            className="ad-Point"
            onMouseDown={ (e) => drag(e, index) }
            cx={ x }
            cy={ y }
            r={ 8 } />
    )
}

export default Point
