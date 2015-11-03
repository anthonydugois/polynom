import React from "react"

function Textarea(props) {
    const {
        onChange,
        value,
        ..._props,
    } = props

    return (
        <textarea
            className="ad-Textarea"
            value={ value }
            onChange={ onChange }
            { ..._props } />
    )
}

export default Textarea
