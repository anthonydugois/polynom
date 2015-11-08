import React from "react"

function Checkbox(props) {
    return (
        <label className="ad-Checkbox">
            <input
                className="ad-Checkbox-input"
                type="checkbox"
                { ...props } />

            <div className="ad-Checkbox-fake" />
        </label>
    )
}

export default Checkbox
