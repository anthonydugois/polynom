import React from "react"

function Text(props) {
    const {
        onChange,
        value,
    } = props

    return (
        <input
            type="text"
            className="ad-Text"
            value={ value }
            onChange={ onChange } />
    )
}

export default Text
