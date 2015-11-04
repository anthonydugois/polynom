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
            cx={ x }
            cy={ y }
            r={ 8 }
            onMouseDown={ (e) => drag(e, index) } />
    )
}

export default Point
