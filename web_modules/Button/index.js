import React from "react"
import cx from "classnames"

import Icon from "Icon"

function Button(props) {
    let {
        action,
        icon,
        onClick,
        value,
    } = props

    return (
        <button
            type="button"
            className={ cx("ad-Button", `ad-Button--${ action ? action : "default" }`) }
            onClick={ onClick }>
            { icon && (<Icon name={ icon } />) }
            { value && (
                <span className="ad-Button-text">
                    { value }
                </span>
            ) }
        </button>
    )
}

export default Button
