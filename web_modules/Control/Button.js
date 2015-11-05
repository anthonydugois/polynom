import React from "react"
import cx from "classnames"

function Button(props) {
    const {
        action,
        onClick,
        value,
    } = props

    return (
        <button
            type="button"
            className={ cx("ad-Button", `ad-Button--${ action ? action : "default" }`) }
            onClick={ onClick }>
            { value }
        </button>
    )
}

export default Button
