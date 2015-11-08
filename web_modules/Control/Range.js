import React from "react"

import Text from "./Text"

function Range(props) {
    const {
        value,
        onChange,
        ..._props,
    } = props

    return (
        <div className="ad-Range">
            <input
                className="ad-Range-input"
                type="range"
                value={ value }
                onChange={ onChange }
                { ..._props } />

            <Text
                value={ value }
                onChange={ onChange } />
        </div>
    )
}

export default Range
