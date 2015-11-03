import React from "react"
import cx from "classnames"

function Button(props) {
    const {
        action,
        onClick,
        value,
    } = props

    let _action = action ? action : "default";

    return (
        <button
            type="button"
            className={ cx("ad-Button", `ad-Button--${_action}`) }
            onClick={ onClick }>
            { value }
        </button>
    )
}

export default Button
