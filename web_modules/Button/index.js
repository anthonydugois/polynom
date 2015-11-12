import React from "react"
import cx from "classnames"

import Icon from "Icon"

import "./styles"

function Button(props) {
  let {
    action,
    icon,
    value,
    ..._props,
  } = props

  return (
    <button
      type="button"
      className={ cx("ad-Button", `ad-Button--${ action ? action : "default" }`) }
      { ..._props }>
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
