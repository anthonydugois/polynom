import React from "react"

import "./styles"

function Icon(props) {
    const { name } = props

    return (
        <svg
            className="ad-Icon"
            viewBox="0 0 1024 1024">
            <path d={ getIcon(name) } />
        </svg>
    )
}

function getIcon(name) {
    let icon

    switch (name) {
        case "right":
            icon = "M366 698l196-196-196-196 60-60 256 256-256 256z"
        break

        case "down":
            icon = "M316 334l196 196 196-196 60 60-256 256-256-256z"
        break

        default:
            icon = ""
        break
    }

    return icon
}

export default Icon
