import React from "react"

function Text(props) {
    return (
        <input
            type="text"
            className="ad-Text"
            { ...props } />
    )
}

export default Text
