import React from "react"

import Text from "./Text"

function Range(props) {
    const {
        min,
        max,
        step,
        value,
        onChange,
    } = props

    return (
        <div className="ad-Range">
            <input
                className="ad-Range-input"
                type="range"
                min={ min }
                max={ max }
                step={ step }
                value={ value }
                onChange={ onChange } />

            <Text
                value={ value }
                onChange={ onChange } />
        </div>
    )
}

export default Range
