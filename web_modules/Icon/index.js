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

        case "add":
            icon = "M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"
        break

        case "close":
            icon = "M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
        break

        case "delete":
            icon = "M810 170v86h-596v-86h148l44-42h212l44 42h148zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"
        break

        case "edit":
            icon = "M884 300l-78 78-160-160 78-78q12-12 30-12t30 12l100 100q12 12 12 30t-12 30zM128 736l472-472 160 160-472 472h-160v-160z"
        break

        default:
            icon = ""
        break
    }

    return icon
}

export default Icon
