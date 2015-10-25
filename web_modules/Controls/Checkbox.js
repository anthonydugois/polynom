import React from "react"

function Checkbox(props) {
    const {
        onChange,
        checked,
    } = props

    return (
        <label className="ad-Checkbox">
            <input
                className="ad-Checkbox-input"
                type="checkbox"
                onChange={ onChange }
                checked={ checked } />

            <div className="ad-Checkbox-fake" />
        </label>
    )
}

export default Checkbox
